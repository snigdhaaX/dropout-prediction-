from fastapi import FastAPI, HTTPException
import joblib
import pandas as pd
from pydantic import BaseModel, Field
from typing import List
from supabase import create_client

app = FastAPI()

# --- CONFIGURATION ---
# Replace with your actual Supabase details
URL = "https://kvsohwryaggrhmlqmmml.supabase.co"
KEY = "sb_publishable_bTA2YyLEgW6XyoI2MKQlww_-1rTf1wT"
supabase = create_client(URL, KEY)

# Load your model
try:
    model = joblib.load('continuum_rf_model.pkl')
except Exception as e:
    print(f"Error loading model: {e}")

# --- DATA SCHEMA ---
# This matches your exact X_train columns for the ML model
class StudentData(BaseModel):
    student_id: str
    student_name: str
    age_at_enrollment: int = Field(alias='Age at enrollment')
    gender: int = Field(alias='Gender')
    tuition_fees_up_to_date: int = Field(alias='Tuition fees up to date')
    scholarship_holder: int = Field(alias='Scholarship holder')
    debtor: int = Field(alias='Debtor')
    curr_1st_enrolled: int = Field(alias='Curricular units 1st sem (enrolled)')
    curr_1st_evals: int = Field(alias='Curricular units 1st sem (evaluations)')
    curr_1st_approved: int = Field(alias='Curricular units 1st sem (approved)')
    prev_qualification: int = Field(alias='Previous qualification')
    app_mode: int = Field(alias='Application mode')
    # New behavioral data for the Stress Formula
    attendance: float
    internal_1: float
    internal_2: float

    class Config:
        populate_by_name = True

# --- LOGIC ---
def calculate_final_risk(data: StudentData, ml_prob: float):
    # Stress Score = (Attendance Drop * 2) + (Grade Drop * 1.5) + (ML Risk * 40)
    att_drop = max(0, 90 - data.attendance)
    grade_drop = max(0, data.internal_1 - data.internal_2)
    score = (att_drop * 2) + (grade_drop * 1.5) + (ml_prob * 40)
    return min(100, round(score, 2))

@app.get("/")
def home():
    return {"status": "Continuum Backend Online"}

@app.post("/predict_and_sync")
def predict_and_sync(students: List[StudentData]):
    """Processes students and saves results to Supabase immediately"""
    if not students:
        raise HTTPException(status_code=400, detail="No data provided")

    # 1. Prepare data for ML Model (Must match X_train exactly)
    # Use aliases to get 'Age at enrollment' etc.
    df = pd.DataFrame([s.model_dump(by_alias=True) for s in students])
    
    # Filter for only the 10 columns the model was trained on
    ml_features = [
        'Age at enrollment', 'Gender', 'Tuition fees up to date', 
        'Scholarship holder', 'Debtor', 'Curricular units 1st sem (enrolled)', 
        'Curricular units 1st sem (evaluations)', 'Curricular units 1st sem (approved)', 
        'Previous qualification', 'Application mode'
    ]
    probabilities = model.predict_proba(df[ml_features])[:, 1]

    sync_data = []
    for i, s in enumerate(students):
        stress = calculate_final_risk(s, probabilities[i])
        
        # Prepare the row for the Supabase 'students' table
        sync_data.append({
            "student_id": s.student_id,
            "student_name": s.student_name,
            "age_enrollment": s.age_at_enrollment,
            "gender": s.gender,
            "fees_up_to_date": s.tuition_fees_up_to_date,
            "scholarship": s.scholarship_holder,
            "debtor": s.debtor,
            "units_enrolled": s.curr_1st_enrolled,
            "units_evaluations": s.curr_1st_evals,
            "units_approved": s.curr_1st_approved,
            "attendance_pct": s.attendance,
            "internal_marks_1": s.internal_1,
            "internal_marks_2": s.internal_2,
            "stress_score": stress,
            "risk_level": "High" if stress > 60 else "Low"
        })

    # 2. Batch Sync to Supabase
    try:
        supabase.table("students").upsert(sync_data).execute()
        return {"status": "Success", "records_synced": len(sync_data)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allows all websites to connect
    allow_methods=["*"],
    allow_headers=["*"],
)