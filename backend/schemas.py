from typing import List, Optional
from pydantic import BaseModel, ConfigDict

class BaseSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

class ProfileSchema(BaseSchema):
    id: int
    full_name: str
    primary_title: str
    brand_slogan: str
    email: str
    phone: str
    location: str
    short_bio: str
    full_about: str
    portrait_url: str
    is_active: bool

class SocialLinkSchema(BaseSchema):
    id: int
    platform: str
    url: str
    display_label: str
    icon_name: str
    display_order: int

class EducationSchema(BaseSchema):
    id: int
    degree: str
    institution: str
    score: Optional[str] = None
    completion_date: str
    start_date: Optional[str] = None
    description: Optional[str] = None
    display_order: int

class ExperienceSchema(BaseSchema):
    id: int
    company: str
    role: str
    duration: str
    year: str
    location: Optional[str] = None
    bullet_points: List[str]
    tech_tags: Optional[List[str]] = None
    display_order: int

class ProjectTechnologySchema(BaseSchema):
    id: int
    name: str
    category: str

class ProjectSchema(BaseSchema):
    id: int
    slug: str
    title: str
    tagline: Optional[str] = None
    year: str
    organization: str
    description: str
    problem: str
    solution: str
    contribution: str
    measurable_results: Optional[str] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    featured: bool
    display_order: int
    primary_category: str
    technologies: List[ProjectTechnologySchema] = []

class SkillSchema(BaseSchema):
    id: int
    name: str
    icon_slug: Optional[str] = None
    is_featured: bool
    display_order: int

class SkillCategorySchema(BaseSchema):
    id: int
    name: str
    slug: str
    description: Optional[str] = None
    display_order: int
    skills: List[SkillSchema] = []

class CertificationSchema(BaseSchema):
    id: int
    name: str
    issuer: str
    issue_date: Optional[str] = None
    credential_id: Optional[str] = None
    verification_url: Optional[str] = None
    image_url: Optional[str] = None
    pdf_url: Optional[str] = None
    is_featured: bool
    category: str
    display_order: int

class AchievementSchema(BaseSchema):
    id: int
    title: str
    event: str
    year: str
    description: str
    category: str
    display_order: int

class HackathonSchema(BaseSchema):
    id: int
    title: str
    role_or_focus: str
    year: str
    description: str
    display_order: int

class ActivitySchema(BaseSchema):
    id: int
    title: str
    role: str
    year: str
    description: str
    display_order: int

class ResumeSchema(BaseSchema):
    id: int
    title: str
    filename: str
    file_path: str
    is_primary: bool
    uploaded_at: Optional[str] = None

class PortfolioSummarySchema(BaseSchema):
    profile: ProfileSchema
    social_links: List[SocialLinkSchema]
    education: List[EducationSchema]
    experience: List[ExperienceSchema]
    projects: List[ProjectSchema]
    skill_categories: List[SkillCategorySchema]
    certifications: List[CertificationSchema]
    achievements: List[AchievementSchema]
    hackathons: List[HackathonSchema]
    activities: List[ActivitySchema]
    resume: Optional[ResumeSchema]
