from sqlalchemy import Column, Integer, String, Text, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(100), nullable=False)
    primary_title = Column(String(150), nullable=False)
    brand_slogan = Column(String(100), default="Wild Idea. Wealthy Innovation.")
    email = Column(String(120), nullable=False)
    phone = Column(String(50), nullable=False)
    location = Column(String(100), nullable=False)
    short_bio = Column(Text, nullable=False)
    full_about = Column(Text, nullable=False)
    portrait_url = Column(String(255), default="/photos/tharun_vaibhav_portrait.jpg")
    is_active = Column(Boolean, default=True)


class SocialLink(Base):
    __tablename__ = "social_links"

    id = Column(Integer, primary_key=True, index=True)
    platform = Column(String(50), nullable=False)
    url = Column(String(255), nullable=False)
    display_label = Column(String(100), nullable=False)
    icon_name = Column(String(50), nullable=False)
    display_order = Column(Integer, default=0)


class Education(Base):
    __tablename__ = "education"

    id = Column(Integer, primary_key=True, index=True)
    degree = Column(String(150), nullable=False)
    institution = Column(String(200), nullable=False)
    score = Column(String(50), nullable=True)
    completion_date = Column(String(50), nullable=False)
    start_date = Column(String(50), nullable=True)
    description = Column(Text, nullable=True)
    display_order = Column(Integer, default=0)


class Experience(Base):
    __tablename__ = "experience"

    id = Column(Integer, primary_key=True, index=True)
    company = Column(String(150), nullable=False)
    role = Column(String(150), nullable=False)
    duration = Column(String(100), nullable=False)
    year = Column(String(20), nullable=False)
    location = Column(String(100), nullable=True)
    bullet_points = Column(Text, nullable=False)  # JSON or newline-separated
    tech_tags = Column(String(255), nullable=True)
    display_order = Column(Integer, default=0)


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(100), unique=True, index=True, nullable=False)
    title = Column(String(200), nullable=False)
    tagline = Column(String(255), nullable=True)
    year = Column(String(20), nullable=False)
    organization = Column(String(150), nullable=False)
    description = Column(Text, nullable=False)
    problem = Column(Text, nullable=False)
    solution = Column(Text, nullable=False)
    contribution = Column(Text, nullable=False)
    measurable_results = Column(String(255), nullable=True)
    github_url = Column(String(255), nullable=True)
    live_url = Column(String(255), nullable=True)
    featured = Column(Boolean, default=False)
    display_order = Column(Integer, default=0)
    primary_category = Column(String(50), default="SOFTWARE")  # AI, DATA, IoT, SOFTWARE

    technologies = relationship("ProjectTechnology", back_populates="project", cascade="all, delete-orphan")


class ProjectTechnology(Base):
    __tablename__ = "project_technologies"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    name = Column(String(100), nullable=False)
    category = Column(String(50), default="Core")

    project = relationship("Project", back_populates="technologies")


class SkillCategory(Base):
    __tablename__ = "skill_categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    slug = Column(String(100), unique=True, nullable=False)
    description = Column(String(255), nullable=True)
    display_order = Column(Integer, default=0)

    skills = relationship("Skill", back_populates="category", cascade="all, delete-orphan")


class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    category_id = Column(Integer, ForeignKey("skill_categories.id"), nullable=False)
    name = Column(String(100), nullable=False)
    icon_slug = Column(String(50), nullable=True)
    is_featured = Column(Boolean, default=False)
    display_order = Column(Integer, default=0)

    category = relationship("SkillCategory", back_populates="skills")


class Certification(Base):
    __tablename__ = "certifications"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    issuer = Column(String(150), nullable=False)
    issue_date = Column(String(50), nullable=True)
    credential_id = Column(String(100), nullable=True)
    verification_url = Column(String(255), nullable=True)
    image_url = Column(String(255), nullable=True)
    pdf_url = Column(String(255), nullable=True)
    is_featured = Column(Boolean, default=False)
    category = Column(String(50), default="Technical")
    display_order = Column(Integer, default=0)


class Achievement(Base):
    __tablename__ = "achievements"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    event = Column(String(200), nullable=False)
    year = Column(String(20), nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String(50), default="Award")
    display_order = Column(Integer, default=0)


class Hackathon(Base):
    __tablename__ = "hackathons"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    role_or_focus = Column(String(200), nullable=False)
    year = Column(String(20), nullable=False)
    description = Column(Text, nullable=False)
    display_order = Column(Integer, default=0)


class Activity(Base):
    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    role = Column(String(150), nullable=False)
    year = Column(String(20), nullable=False)
    description = Column(Text, nullable=False)
    display_order = Column(Integer, default=0)


class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150), nullable=False)
    filename = Column(String(150), nullable=False)
    file_path = Column(String(255), nullable=False)
    is_primary = Column(Boolean, default=False)
    uploaded_at = Column(String(50), nullable=True)
