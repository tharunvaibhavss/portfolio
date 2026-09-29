import os
import json
from typing import List, Optional
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from database import engine, get_db, Base
import models
import schemas

# Create tables if not existing
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Tharun Vaibhav S S Portfolio API",
    description="Production REST API serving verified portfolio, engineering projects, experience, skills, and certifications.",
    version="1.0.0"
)

# CORS configuration
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static asset folders
STATIC_DIR = os.path.join(os.path.dirname(__file__), "static")
if os.path.exists(STATIC_DIR):
    app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")
    
    photos_dir = os.path.join(STATIC_DIR, "photos")
    if os.path.exists(photos_dir):
        app.mount("/photos", StaticFiles(directory=photos_dir), name="photos")
        
    certs_dir = os.path.join(STATIC_DIR, "certificates")
    if os.path.exists(certs_dir):
        app.mount("/certificates", StaticFiles(directory=certs_dir), name="certificates")
        
    resumes_dir = os.path.join(STATIC_DIR, "resumes")
    if os.path.exists(resumes_dir):
        app.mount("/resumes", StaticFiles(directory=resumes_dir), name="resumes")

@app.get("/api/health", tags=["Health"])
def health_check():
    return {"status": "healthy", "service": "Tharun Vaibhav Portfolio API", "version": "1.0.0"}

@app.get("/api/profile", response_model=schemas.ProfileSchema, tags=["Profile"])
def get_profile(db: Session = Depends(get_db)):
    profile = db.query(models.Profile).filter(models.Profile.is_active == True).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

@app.get("/api/social-links", response_model=List[schemas.SocialLinkSchema], tags=["Social Links"])
def get_social_links(db: Session = Depends(get_db)):
    return db.query(models.SocialLink).order_by(models.SocialLink.display_order.asc()).all()

@app.get("/api/education", response_model=List[schemas.EducationSchema], tags=["Education"])
def get_education(db: Session = Depends(get_db)):
    return db.query(models.Education).order_by(models.Education.display_order.asc()).all()

@app.get("/api/experience", response_model=List[schemas.ExperienceSchema], tags=["Experience"])
def get_experience(db: Session = Depends(get_db)):
    experiences = db.query(models.Experience).order_by(models.Experience.display_order.asc()).all()
    results = []
    for exp in experiences:
        bullets = json.loads(exp.bullet_points) if exp.bullet_points else []
        tags = [t.strip() for t in exp.tech_tags.split(",")] if exp.tech_tags else []
        results.append(schemas.ExperienceSchema(
            id=exp.id,
            company=exp.company,
            role=exp.role,
            duration=exp.duration,
            year=exp.year,
            location=exp.location,
            bullet_points=bullets,
            tech_tags=tags,
            display_order=exp.display_order
        ))
    return results

@app.get("/api/projects", response_model=List[schemas.ProjectSchema], tags=["Projects"])
def get_projects(db: Session = Depends(get_db)):
    return db.query(models.Project).order_by(models.Project.display_order.asc()).all()

@app.get("/api/projects/{slug_or_id}", response_model=schemas.ProjectSchema, tags=["Projects"])
def get_project(slug_or_id: str, db: Session = Depends(get_db)):
    if slug_or_id.isdigit():
        proj = db.query(models.Project).filter(models.Project.id == int(slug_or_id)).first()
    else:
        proj = db.query(models.Project).filter(models.Project.slug == slug_or_id).first()
        
    if not proj:
        raise HTTPException(status_code=404, detail="Project not found")
    return proj

@app.get("/api/skills", response_model=List[schemas.SkillCategorySchema], tags=["Skills"])
def get_skills(db: Session = Depends(get_db)):
    return db.query(models.SkillCategory).order_by(models.SkillCategory.display_order.asc()).all()

@app.get("/api/certifications", response_model=List[schemas.CertificationSchema], tags=["Certifications"])
def get_certifications(featured_only: Optional[bool] = None, db: Session = Depends(get_db)):
    query = db.query(models.Certification)
    if featured_only is not None:
        query = query.filter(models.Certification.is_featured == featured_only)
    return query.order_by(models.Certification.display_order.asc()).all()

@app.get("/api/achievements", response_model=List[schemas.AchievementSchema], tags=["Achievements"])
def get_achievements(db: Session = Depends(get_db)):
    return db.query(models.Achievement).order_by(models.Achievement.display_order.asc()).all()

@app.get("/api/hackathons", response_model=List[schemas.HackathonSchema], tags=["Hackathons"])
def get_hackathons(db: Session = Depends(get_db)):
    return db.query(models.Hackathon).order_by(models.Hackathon.display_order.asc()).all()

@app.get("/api/activities", response_model=List[schemas.ActivitySchema], tags=["Activities"])
def get_activities(db: Session = Depends(get_db)):
    return db.query(models.Activity).order_by(models.Activity.display_order.asc()).all()

@app.get("/api/resume", response_model=Optional[schemas.ResumeSchema], tags=["Resume"])
def get_primary_resume(db: Session = Depends(get_db)):
    resume = db.query(models.Resume).filter(models.Resume.is_primary == True).first()
    return resume

@app.get("/api/resume/download", tags=["Resume"])
def download_resume(db: Session = Depends(get_db)):
    resume = db.query(models.Resume).filter(models.Resume.is_primary == True).first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
        
    actual_path = os.path.join(STATIC_DIR, "resumes", "Tharun_Vaibhav_Resume.pdf")
    if not os.path.exists(actual_path):
        raise HTTPException(status_code=404, detail="Resume file not found on disk")
        
    return FileResponse(
        actual_path,
        media_type="application/pdf",
        filename="Tharun_Vaibhav_Resume.pdf"
    )

@app.get("/api/portfolio-summary", response_model=schemas.PortfolioSummarySchema, tags=["Summary"])
def get_portfolio_summary(db: Session = Depends(get_db)):
    profile = db.query(models.Profile).filter(models.Profile.is_active == True).first()
    social_links = db.query(models.SocialLink).order_by(models.SocialLink.display_order.asc()).all()
    education = db.query(models.Education).order_by(models.Education.display_order.asc()).all()
    
    experiences = db.query(models.Experience).order_by(models.Experience.display_order.asc()).all()
    exp_schemas = []
    for exp in experiences:
        bullets = json.loads(exp.bullet_points) if exp.bullet_points else []
        tags = [t.strip() for t in exp.tech_tags.split(",")] if exp.tech_tags else []
        exp_schemas.append(schemas.ExperienceSchema(
            id=exp.id,
            company=exp.company,
            role=exp.role,
            duration=exp.duration,
            year=exp.year,
            location=exp.location,
            bullet_points=bullets,
            tech_tags=tags,
            display_order=exp.display_order
        ))
        
    projects = db.query(models.Project).order_by(models.Project.display_order.asc()).all()
    skill_categories = db.query(models.SkillCategory).order_by(models.SkillCategory.display_order.asc()).all()
    certifications = db.query(models.Certification).order_by(models.Certification.display_order.asc()).all()
    achievements = db.query(models.Achievement).order_by(models.Achievement.display_order.asc()).all()
    hackathons = db.query(models.Hackathon).order_by(models.Hackathon.display_order.asc()).all()
    activities = db.query(models.Activity).order_by(models.Activity.display_order.asc()).all()
    resume = db.query(models.Resume).filter(models.Resume.is_primary == True).first()

    return schemas.PortfolioSummarySchema(
        profile=profile,
        social_links=social_links,
        education=education,
        experience=exp_schemas,
        projects=projects,
        skill_categories=skill_categories,
        certifications=certifications,
        achievements=achievements,
        hackathons=hackathons,
        activities=activities,
        resume=resume
    )
