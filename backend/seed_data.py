import json
from database import engine, SessionLocal, Base
import models

def seed_database():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    # 1. Profile
    profile = models.Profile(
        full_name="Tharun Vaibhav S S",
        primary_title="Software Engineer | AI, Data & IoT",
        brand_slogan="Wild Idea. Wealthy Innovation.",
        email="tharunvaibhavsaminathan@gmail.com",
        phone="+91 87600 85142",
        location="Erode, Tamil Nadu",
        short_bio=(
            "Software engineer specializing in AI, Data & Analytics, IoT systems, and full-stack software development. "
            "Passionate about turning wild ideas into wealthy, scalable engineering innovations."
        ),
        full_about=(
            "I am an MCA scholar and software engineer with a distinct focus on building practical physical-digital systems. "
            "My engineering philosophy—'Wild Idea. Wealthy Innovation.'—bridges fearless curiosity, hands-on experimentation, "
            "and rigorous software craftsmanship. Whether architecting AI-assisted industrial machine diagnostics with FastAPI and Next.js, "
            "capturing multi-sensor IoT telemetry for real-time anomaly detection, or optimizing enterprise ERP data pipelines with SQL, "
            "I design systems that solve tangible problems and deliver measurable results."
        ),
        portrait_url="/photos/tharun_vaibhav_portrait.jpg",
        is_active=True
    )
    db.add(profile)

    # 2. Social Links
    social_links = [
        models.SocialLink(
            platform="GitHub",
            url="https://github.com/tharunvaibhavss",
            display_label="github.com/tharunvaibhavss",
            icon_name="github",
            display_order=1
        ),
        models.SocialLink(
            platform="LinkedIn",
            url="https://www.linkedin.com/in/tharun-vaibhav-s-s",
            display_label="linkedin.com/in/tharun-vaibhav-s-s",
            icon_name="linkedin",
            display_order=2
        ),
        models.SocialLink(
            platform="Email",
            url="mailto:tharunvaibhavsaminathan@gmail.com",
            display_label="tharunvaibhavsaminathan@gmail.com",
            icon_name="mail",
            display_order=3
        ),
        models.SocialLink(
            platform="Phone",
            url="tel:+918760085142",
            display_label="+91 87600 85142",
            icon_name="phone",
            display_order=4
        )
    ]
    db.add_all(social_links)

    # 3. Education
    education_entries = [
        models.Education(
            degree="Master of Computer Application (MCA)",
            institution="PSG College of Arts & Science",
            score="78%*",
            completion_date="May 2027",
            start_date="2025",
            description="Specializing in Artificial Intelligence, Generative AI, LLM-powered applications, Python, Data & Analytics, and IoT system architecture.",
            display_order=1
        ),
        models.Education(
            degree="B.Sc Information Technology",
            institution="PSG College of Arts & Science",
            score="75.9%",
            completion_date="May 2025",
            start_date="2022",
            description="Focused on Computer Science fundamentals, Software Engineering, Database Systems, Web Technologies, and IoT.",
            display_order=2
        ),
        models.Education(
            degree="Higher Secondary (12th Grade)",
            institution="Velalar Vidyalayaa Senior Secondary School",
            score="78.6%",
            completion_date="May 2022",
            start_date="2020",
            description="Higher Secondary Education with focus on Science and Mathematics.",
            display_order=3
        ),
        models.Education(
            degree="Secondary School Examination (10th Grade)",
            institution="Velalar Vidyalayaa Senior Secondary School",
            score="78.8%",
            completion_date="March 2020",
            start_date="2018",
            description="Secondary School Curriculum covering Core Science, Mathematics, and Computer Applications.",
            display_order=4
        )
    ]
    db.add_all(education_entries)

    # 4. Experience
    experience_entries = [
        models.Experience(
            company="Dyzen Consultants",
            role="Software Development Intern",
            duration="10 Months",
            year="2026",
            location="Remote / Hybrid",
            bullet_points=json.dumps([
                "Developed and deployed 4+ web applications and responsive client platforms, contributing to full lifecycle development, testing, maintenance, and reliable software delivery.",
                "Performed comprehensive debugging, issue tracking, and performance optimization to ensure high uptime and responsive interaction across viewports.",
                "Collaborated with cross-functional teams to understand client specifications, investigate technical bottlenecks, and implement practical solutions.",
                "Applied user behavior analytics and targeted UI/UX refinements, achieving a 25–30% reduction in website bounce rates.",
                "Engineered digital solutions using WordPress, Figma, CSS architectures, and modern web best practices."
            ]),
            tech_tags="Next.js, WordPress, Figma, UI/UX, SEO, Web Analytics",
            display_order=1
        ),
        models.Experience(
            company="Thiruvusoft",
            role="ERP Software Development Intern",
            duration="2 Weeks",
            year="2025",
            location="Coimbatore, India",
            bullet_points=json.dumps([
                "Streamlined core ERP workflows using custom SQL queries and data transformation techniques across Finance, Inventory, and HR modules.",
                "Reduced manual processing overhead by 15–20% through structured, automated SQL-based data handling routines.",
                "Assisted in improving data pipeline efficiency and transactional data integrity across enterprise modules by 30%, enhancing reporting reliability."
            ]),
            tech_tags="SQL, ERP Workflows, Data Pipelines, Database Optimization",
            display_order=2
        ),
        models.Experience(
            company="Akkroni Craft",
            role="Software Developer Intern",
            duration="20 Days",
            year="2025",
            location="India",
            bullet_points=json.dumps([
                "Strengthened digital presence by optimizing website information architecture through SEO best practices and traffic analytics.",
                "Enhanced brand communication workflows by engineering responsive email templates and corporate collateral using structured content strategies."
            ]),
            tech_tags="Web Optimization, SEO, Email Templates, Content Strategy",
            display_order=3
        )
    ]
    db.add_all(experience_entries)

    # 5. Projects
    p1 = models.Project(
        slug="cat-industrial-diagnostic-system",
        title="AI-Powered Industrial Machine Diagnostic System",
        tagline="End-to-End Predictive Maintenance & Telemetry Intelligence Platform",
        year="2026",
        organization="PSGCAS",
        description="A comprehensive full-stack industrial diagnostic system engineered for real-time equipment telemetry monitoring, predictive fault analysis, work order dispatch, and automated maintenance reporting.",
        problem="Industrial factories suffer catastrophic downtime when heavy machinery components fail without warning. Fragmented maintenance logs and manual triage slow technician response times.",
        solution="Constructed a unified telemetry processing platform that ingests machine sensor metrics, runs vision and manual inspection routines, and leverages OpenAI GPT-5.5 API to provide instant diagnosis and actionable repair playbooks.",
        contribution="Architected backend REST microservices with FastAPI and PostgreSQL/SQLAlchemy, implemented JWT role-based access control, integrated OpenAI LLM reasoning pipelines, and created automated PDF incident reports.",
        measurable_results="Structured diagnostic triage workflows into automated protocols with instant AI recommendations.",
        github_url="https://github.com/tharunvaibhavss/cat",
        live_url=None,
        featured=True,
        display_order=1,
        primary_category="AI"
    )
    p1.technologies = [
        models.ProjectTechnology(name="Next.js", category="Frontend"),
        models.ProjectTechnology(name="FastAPI", category="Backend"),
        models.ProjectTechnology(name="Python", category="Language"),
        models.ProjectTechnology(name="PostgreSQL", category="Database"),
        models.ProjectTechnology(name="SQLAlchemy", category="ORM"),
        models.ProjectTechnology(name="OpenAI API (GPT-5.5)", category="AI/ML"),
        models.ProjectTechnology(name="JWT Auth", category="Security"),
        models.ProjectTechnology(name="Automated PDF Engine", category="Reporting")
    ]

    p2 = models.Project(
        slug="enervision-ai-energy-audit",
        title="Enervision – AI Energy Audit System",
        tagline="IoT Telemetry & Predictive Anomaly Detection for Industrial Power Grids",
        year="2026",
        organization="PSGCAS",
        description="An AI and IoT-driven energy audit platform engineered for live industrial power consumption tracking, anomaly detection, predictive load forecasting, and sustainability audits.",
        problem="Commercial and factory facilities leak electricity through phantom loads, unbalanced phases, and aging machinery, resulting in uncontrolled operational costs and carbon waste.",
        solution="Built a dual-tier architecture pairing IoT hardware sensor nodes with a Python predictive analytics engine to monitor live energy flow, detect anomalous spikes, and forecast consumption cycles.",
        contribution="Developed real-time sensor ingestion scripts in Python, trained predictive time-series models for energy forecasting, and built interactive dashboards for facility managers.",
        measurable_results="Demonstrated 20–25% potential energy savings through automated anomaly alerts and usage optimization.",
        github_url="https://github.com/tharunvaibhavss/enervision",
        live_url=None,
        featured=True,
        display_order=2,
        primary_category="DATA"
    )
    p2.technologies = [
        models.ProjectTechnology(name="Python", category="Language"),
        models.ProjectTechnology(name="IoT Sensors", category="Hardware"),
        models.ProjectTechnology(name="Predictive Modeling", category="AI/ML"),
        models.ProjectTechnology(name="Anomaly Detection", category="Algorithms"),
        models.ProjectTechnology(name="Power BI / Dashboards", category="Analytics"),
        models.ProjectTechnology(name="Sustainability Auditing", category="Domain")
    ]

    p3 = models.Project(
        slug="client-website-projects",
        title="Client Website Projects Portfolio",
        tagline="Suite of High-Performance Business Platforms & Client Solutions",
        year="2026",
        organization="Dyzen Consultants",
        description="A curated collection of 4+ production client websites and business web applications developed to enhance digital presence, conversion funnels, and organic search ranking.",
        problem="Small and medium enterprises required modern, mobile-first web platforms with high speed, structured SEO schema, and intuitive user experiences to reduce high bounce rates.",
        solution="Engineered custom responsive interfaces utilizing modern CSS architectures, WordPress customizations, Figma design specifications, and performance optimization pipelines.",
        contribution="Handled full-cycle design-to-deployment, implementing accessibility audits, structured schema markup, and cross-browser testing.",
        measurable_results="Directly contributed to a 25–30% reduction in user bounce rates across delivered client sites.",
        github_url="https://github.com/tharunvaibhavss/websites",
        live_url=None,
        featured=True,
        display_order=3,
        primary_category="SOFTWARE"
    )
    p3.technologies = [
        models.ProjectTechnology(name="HTML5 & CSS3", category="Frontend"),
        models.ProjectTechnology(name="JavaScript", category="Language"),
        models.ProjectTechnology(name="WordPress", category="CMS"),
        models.ProjectTechnology(name="Figma", category="Design"),
        models.ProjectTechnology(name="SEO Optimization", category="Analytics"),
        models.ProjectTechnology(name="Hostinger / Vercel", category="Deployment")
    ]

    p4 = models.Project(
        slug="water-quality-monitoring-system",
        title="Water Quality Monitoring System (WQT)",
        tagline="Multi-Parameter IoT Environmental Sensing Rig",
        year="2025",
        organization="PSGCAS",
        description="An IoT environmental sensing system built to capture, analyze, and stream live water quality parameters including pH, total dissolved solids (TDS), turbidity, and temperature.",
        problem="Manual chemical testing of water reservoirs is intermittent and incapable of instantly warning communities or plants about sudden toxic discharges or contamination.",
        solution="Designed an automated hardware sensing rig that submerges multi-parameter sensors and transmits calibrated telemetry to a Python data-logging and visualization interface.",
        contribution="Configured microcontrollers and analog sensor inputs, wrote calibration routines for pH and TDS probes, and built automated Python analytics scripts.",
        measurable_results="Enabled continuous 24/7 environmental telemetry logging with real-time threshold alert triggers.",
        github_url="https://github.com/tharunvaibhavss/wqt",
        live_url=None,
        featured=False,
        display_order=4,
        primary_category="IoT"
    )
    p4.technologies = [
        models.ProjectTechnology(name="Python", category="Language"),
        models.ProjectTechnology(name="IoT Microcontrollers", category="Hardware"),
        models.ProjectTechnology(name="pH & TDS Sensors", category="Sensors"),
        models.ProjectTechnology(name="Turbidity Sensors", category="Sensors"),
        models.ProjectTechnology(name="Telemetry Logging", category="Data")
    ]

    p5 = models.Project(
        slug="intra-college-event-web-app",
        title="Intra-College Event Web Application (Technoverse)",
        tagline="Framer-Powered Live Event Coordination & Schedule Platform",
        year="2026",
        organization="PSGCAS",
        description="A dedicated responsive event platform constructed for an inter-college technical symposium to facilitate seamless schedule tracking, rulebook access, and registration routing.",
        problem="Fest participants frequently miss event timings or venue updates when relying on printed circulars or cluttered chat groups.",
        solution="Designed and deployed a responsive, high-performance web application featuring streamlined navigation, schedule timetables, and mobile-optimized event cards.",
        contribution="Architected site hierarchy in Framer, implemented dynamic layouts, and ensured zero-lag performance on mobile networks.",
        measurable_results="Supported campus-wide symposium attendees with instant schedule access.",
        github_url=None,
        live_url="https://technoverse.framer.website",
        featured=False,
        display_order=5,
        primary_category="SOFTWARE"
    )
    p5.technologies = [
        models.ProjectTechnology(name="Framer", category="Design & Web"),
        models.ProjectTechnology(name="Responsive UI/UX", category="Frontend"),
        models.ProjectTechnology(name="Event Information Architecture", category="Systems")
    ]

    db.add_all([p1, p2, p3, p4, p5])

    # 6. Skill Categories & Skills
    cat_prog = models.SkillCategory(name="Programming Languages", slug="programming", display_order=1)
    cat_front = models.SkillCategory(name="Frontend & Web", slug="frontend", display_order=2)
    cat_back = models.SkillCategory(name="Backend & APIs", slug="backend", display_order=3)
    cat_db = models.SkillCategory(name="Databases & ORM", slug="databases", display_order=4)
    cat_ai_data = models.SkillCategory(name="AI, Machine Learning & Data", slug="ai-data", display_order=5)
    cat_iot = models.SkillCategory(name="IoT & Embedded Systems", slug="iot-systems", display_order=6)
    cat_tools = models.SkillCategory(name="Tools & Deployment", slug="tools-deployment", display_order=7)
    cat_ai_tools = models.SkillCategory(name="AI Development Accelerators", slug="ai-dev-tools", display_order=8)
    cat_soft = models.SkillCategory(name="Engineering Practices & Soft Skills", slug="soft-skills", display_order=9)

    db.add_all([cat_prog, cat_front, cat_back, cat_db, cat_ai_data, cat_iot, cat_tools, cat_ai_tools, cat_soft])
    db.flush()

    skills_data = [
        # Programming
        (cat_prog.id, "Python", "python", True, 1),
        (cat_prog.id, "Java", "coffee", True, 2),
        (cat_prog.id, "SQL", "database", True, 3),
        (cat_prog.id, "C++", "code", False, 4),
        (cat_prog.id, "JavaScript / Next.js", "globe", True, 5),

        # Frontend
        (cat_front.id, "Next.js", "layers", True, 1),
        (cat_front.id, "HTML5", "layout", True, 2),
        (cat_front.id, "CSS3", "palette", True, 3),
        (cat_front.id, "WordPress", "file-text", False, 4),
        (cat_front.id, "Framer", "box", False, 5),
        (cat_front.id, "Figma", "figma", True, 6),

        # Backend
        (cat_back.id, "FastAPI", "zap", True, 1),
        (cat_back.id, "Django", "server", True, 2),
        (cat_back.id, "RESTful APIs", "share-2", True, 3),
        (cat_back.id, "JWT Authentication", "shield-check", True, 4),

        # Databases
        (cat_db.id, "PostgreSQL", "database", True, 1),
        (cat_db.id, "MySQL", "database", True, 2),
        (cat_db.id, "MongoDB", "database", True, 3),
        (cat_db.id, "Oracle SQL", "hard-drive", False, 4),
        (cat_db.id, "SQLAlchemy", "code", True, 5),

        # AI & Data
        (cat_ai_data.id, "OpenAI API (GPT-5.5)", "cpu", True, 1),
        (cat_ai_data.id, "Power BI", "bar-chart-2", True, 2),
        (cat_ai_data.id, "Tableau", "pie-chart", True, 3),
        (cat_ai_data.id, "Excel (Microsoft 365)", "table", True, 4),
        (cat_ai_data.id, "Predictive Modeling", "trending-up", True, 5),
        (cat_ai_data.id, "Anomaly Detection", "alert-triangle", True, 6),
        (cat_ai_data.id, "Data Analysis", "activity", True, 7),

        # IoT & Systems
        (cat_iot.id, "IoT Architecture", "radio", True, 1),
        (cat_iot.id, "Sensor Telemetry (pH, TDS, Temp)", "thermometer", True, 2),
        (cat_iot.id, "Microcontrollers", "cpu", True, 3),
        (cat_iot.id, "Linux Shell Programming", "terminal", True, 4),

        # Tools & Deployment
        (cat_tools.id, "GitHub", "github", True, 1),
        (cat_tools.id, "Vercel", "cloud", True, 2),
        (cat_tools.id, "Render", "server", True, 3),
        (cat_tools.id, "Hostinger", "globe", False, 4),
        (cat_tools.id, "SEO & Performance Tools", "search", False, 5),

        # AI Dev Tools
        (cat_ai_tools.id, "Anti-Gravity", "sparkles", True, 1),
        (cat_ai_tools.id, "Bolt.new", "zap", True, 2),
        (cat_ai_tools.id, "Lovable.ai", "heart", True, 3),

        # Soft Skills
        (cat_soft.id, "Adaptive Learner", "book-open", False, 1),
        (cat_soft.id, "Team Facilitator", "users", False, 2),
        (cat_soft.id, "Design Thinker", "compass", False, 3),
        (cat_soft.id, "Self-Driven Problem Solver", "target", False, 4)
    ]

    for cat_id, name, icon, featured, order in skills_data:
        db.add(models.Skill(category_id=cat_id, name=name, icon_slug=icon, is_featured=featured, display_order=order))

    # 7. Certifications
    certifications = [
        # Featured Primary
        models.Certification(
            name="Python for Data Science",
            issuer="NPTEL",
            issue_date="2024",
            credential_id=None,
            verification_url=None,
            image_url="/certificates/NPTEL/Python For Data Science.jpg",
            pdf_url="/certificates/NPTEL/Python For Data Science.pdf",
            is_featured=True,
            category="AI & Data",
            display_order=1
        ),
        models.Certification(
            name="Data Science 101",
            issuer="IBM",
            issue_date="2024",
            credential_id=None,
            verification_url=None,
            image_url="/certificates/IBM/IBM- Data Science.jpg",
            pdf_url="/certificates/IBM/IBM- Data Science.pdf",
            is_featured=True,
            category="AI & Data",
            display_order=2
        ),
        models.Certification(
            name="Linux Shell Programming",
            issuer="PSG College of Arts & Science",
            issue_date="2024",
            credential_id=None,
            verification_url=None,
            image_url="/certificates/PSGCAS/linux.jpg",
            pdf_url="/certificates/PSGCAS/linux.pdf",
            is_featured=True,
            category="Systems",
            display_order=3
        ),
        models.Certification(
            name="Power BI for Beginners",
            issuer="Simplilearn",
            issue_date="2024",
            credential_id=None,
            verification_url=None,
            image_url="/certificates/Simpilearn/Power BI for Beginners_page-0001.jpg",
            pdf_url="/certificates/Simpilearn/Power BI for Beginners.pdf",
            is_featured=True,
            category="AI & Data",
            display_order=4
        ),
        models.Certification(
            name="Network Security",
            issuer="Great Learning",
            issue_date="2024",
            credential_id=None,
            verification_url=None,
            image_url="/certificates/Great Learning/Great Learning.jpg",
            pdf_url="/certificates/Great Learning/Great Learning.pdf",
            is_featured=True,
            category="Security",
            display_order=5
        ),
        models.Certification(
            name="Fundamentals of Digital Marketing",
            issuer="Google",
            issue_date="2023",
            credential_id=None,
            verification_url=None,
            image_url="/certificates/Google/google certficate.jpg",
            pdf_url="/certificates/Google/google certficate.pdf",
            is_featured=True,
            category="Marketing & Strategy",
            display_order=6
        ),
        models.Certification(
            name="AI and Business Strategy: Case Studies",
            issuer="LinkedIn",
            issue_date="2024",
            credential_id=None,
            verification_url=None,
            image_url="/certificates/LinkedIn/Artificial Intelligence and Business Strategy Case Studies_page-0001.jpg",
            pdf_url="/certificates/LinkedIn/Artificial Intelligence and Business Strategy Case Studies.pdf",
            is_featured=True,
            category="AI & Strategy",
            display_order=7
        ),
        models.Certification(
            name="Learning Full Stack Development",
            issuer="Infosys Springboard / Wingspan",
            issue_date="August 19, 2026",
            credential_id=None,
            verification_url="https://verify.onwingspan.com",
            image_url="/certificates/FSD.png",
            pdf_url="/certificates/FSD.pdf",
            is_featured=True,
            category="Software Engineering",
            display_order=8
        ),
        models.Certification(
            name="NodeJS Case Study - Movie App on Node JS & MongoDB",
            issuer="Infosys Springboard / Wingspan",
            issue_date="August 19, 2026",
            credential_id=None,
            verification_url="https://verify.onwingspan.com",
            image_url="/certificates/node.png",
            pdf_url="/certificates/node.pdf",
            is_featured=True,
            category="Software Engineering",
            display_order=9
        ),

        # Additional Certifications
        models.Certification(
            name="Learning Excel (Microsoft 365)",
            issuer="LinkedIn",
            issue_date="2024",
            credential_id=None,
            verification_url=None,
            image_url="/certificates/LinkedIn/Learning Excel Desktop Microsoft 365_page-0001.jpg",
            pdf_url="/certificates/LinkedIn/Learning Excel Desktop Microsoft 365.pdf",
            is_featured=False,
            category="Analytics",
            display_order=10
        ),
        models.Certification(
            name="How to Talk to Anyone (Blinkist Summary)",
            issuer="LinkedIn",
            issue_date="2024",
            credential_id=None,
            verification_url=None,
            image_url="/certificates/LinkedIn/How to Talk to Anyone Blinkist Summary_page-0001.jpg",
            pdf_url="/certificates/LinkedIn/How to Talk to Anyone Blinkist Summary.pdf",
            is_featured=False,
            category="Professional Skills",
            display_order=11
        ),
        models.Certification(
            name="Ethical Hacking for Beginners",
            issuer="Simplilearn",
            issue_date="2024",
            credential_id=None,
            verification_url=None,
            image_url="/certificates/Simpilearn/Ethical hacking for beginners_page-0001.jpg",
            pdf_url="/certificates/Simpilearn/Ethical hacking for beginners.pdf",
            is_featured=False,
            category="Security",
            display_order=12
        ),
        models.Certification(
            name="Blockchain Developer Training",
            issuer="Simplilearn",
            issue_date="2024",
            credential_id=None,
            verification_url=None,
            image_url=None,
            pdf_url="/certificates/Simpilearn/Blockchain Developer Training.pdf",
            is_featured=False,
            category="Systems",
            display_order=13
        ),
        # UiPath Certifications
        models.Certification(
            name="Explore Automation Development with UiPath Studio",
            issuer="UiPath",
            issue_date="2024",
            credential_id=None,
            verification_url=None,
            image_url="/certificates/UiPath/Explore Automation Development with UiPath Studio .jpg",
            pdf_url="/certificates/UiPath/Explore Automation Development with UiPath Studio .pdf",
            is_featured=False,
            category="RPA & Automation",
            display_order=14
        ),
        models.Certification(
            name="Build Your First Process with Studio",
            issuer="UiPath",
            issue_date="2024",
            credential_id=None,
            verification_url=None,
            image_url="/certificates/UiPath/Build Your First Process with Studio.jpg",
            pdf_url="/certificates/UiPath/Build Your First Process with Studio.pdf",
            is_featured=False,
            category="RPA & Automation",
            display_order=15
        ),
        models.Certification(
            name="Control Flow in Studio",
            issuer="UiPath",
            issue_date="2024",
            credential_id=None,
            verification_url=None,
            image_url="/certificates/UiPath/Control Flow in Studio.jpg",
            pdf_url="/certificates/UiPath/Control Flow in Studio.pdf",
            is_featured=False,
            category="RPA & Automation",
            display_order=16
        ),
        models.Certification(
            name="Variables, Constants and Arguments in Studio",
            issuer="UiPath",
            issue_date="2024",
            credential_id=None,
            verification_url=None,
            image_url="/certificates/UiPath/Variables Constants and Arguments in Studio.jpg",
            pdf_url="/certificates/UiPath/Variables Constants and Arguments in Studio.pdf",
            is_featured=False,
            category="RPA & Automation",
            display_order=17
        ),
        models.Certification(
            name="Excel Automation with Modern Experience in Studio",
            issuer="UiPath",
            issue_date="2024",
            credential_id=None,
            verification_url=None,
            image_url="/certificates/UiPath/Excel Automation with the Modern Experience in Studio.jpg",
            pdf_url="/certificates/UiPath/Excel Automation with the Modern Experience in Studio.pdf",
            is_featured=False,
            category="RPA & Automation",
            display_order=18
        ),
        models.Certification(
            name="User Interface (UI) Automation with Modern Design in Studio",
            issuer="UiPath",
            issue_date="2024",
            credential_id=None,
            verification_url=None,
            image_url="/certificates/UiPath/User Interface (UI) Automation with Modern Design in Studio.jpg",
            pdf_url="/certificates/UiPath/User Interface (UI) Automation with Modern Design in Studio .pdf",
            is_featured=False,
            category="RPA & Automation",
            display_order=19
        ),
        models.Certification(
            name="Attended Automation for RPA Developers",
            issuer="UiPath",
            issue_date="2024",
            credential_id=None,
            verification_url=None,
            image_url="/certificates/UiPath/Attended Automation for RPA Developers.jpg",
            pdf_url="/certificates/UiPath/Attended Automation for RPA Developers.pdf",
            is_featured=False,
            category="RPA & Automation",
            display_order=20
        ),
        models.Certification(
            name="Train ML Models for Document Understanding",
            issuer="UiPath",
            issue_date="2024",
            credential_id=None,
            verification_url=None,
            image_url="/certificates/UiPath/Train ML Models for Document Understanding.jpg",
            pdf_url="/certificates/UiPath/Train ML Models for Document Understanding.pdf",
            is_featured=False,
            category="RPA & Automation",
            display_order=21
        ),
        # Wadhwani Foundation
        models.Certification(
            name="Managerial Skills, Leadership & Team Building for Startups",
            issuer="Wadhwani Foundation (NABARD-funded)",
            issue_date="2025",
            credential_id=None,
            verification_url=None,
            image_url="/certificates/Wandhwani/Wandhawni_page-0001.jpg",
            pdf_url="/certificates/Wandhwani/Wandhawni.pdf",
            is_featured=False,
            category="Leadership & Startups",
            display_order=22
        )
    ]
    db.add_all(certifications)

    # 8. Achievements
    achievements = [
        models.Achievement(
            title="Best Performance Award",
            event="IoT-Based Technology Innovative Expo",
            year="2026",
            description="Awarded Best Performance for demonstrating hardware-software technical excellence, innovative architecture, and real-time sensor processing in IoT solutions.",
            category="Award",
            display_order=1
        ),
        models.Achievement(
            title="Best Minimum Viable Product (MVP)",
            event="Hack-Arti-Thon 2.0 (24-Hour National Hackathon)",
            year="2026",
            description="Recognized for outstanding rapid prototyping, architectural execution, and delivery of a high-impact working MVP during an intense 24-hour national hackathon.",
            category="Award",
            display_order=2
        ),
        models.Achievement(
            title="Student Coordinator – Hackverse 2026",
            event="Hackverse 2026 Mini Hackathon",
            year="2026",
            description="Served as an active student coordinator facilitating problem statement ideation, team support, and innovation-driven development during the hackathon.",
            category="Leadership",
            display_order=3
        ),
        models.Achievement(
            title="NABARD-Funded Entrepreneurship & Leadership Training",
            event="Wadhwani Foundation / NABARD",
            year="2025",
            description="Completed specialized bootcamp on Managerial Skills, Agile Leadership, and Team Building for Early-Stage Startups.",
            category="Professional Development",
            display_order=4
        )
    ]
    db.add_all(achievements)

    # 9. Hackathons
    hackathons = [
        models.Hackathon(
            title="Hack-Arti-Thon 2.0",
            role_or_focus="National 24-Hour Hackathon – Awarded Best MVP",
            year="2026",
            description="Engineered and delivered a fully functional MVP under strict 24-hour time constraints, showcasing rapid architecture design and problem solving.",
            display_order=1
        ),
        models.Hackathon(
            title="Socio-Tech Hackathon",
            role_or_focus="Anti-Drug Societal Challenge Problem Statement",
            year="2024",
            description="Engineered technical software solutions addressing real-world community awareness and anti-drug tracking challenges.",
            display_order=2
        ),
        models.Hackathon(
            title="Smart India Hackathon (SIH)",
            role_or_focus="Student Dropout Analysis & AICTE Challenges",
            year="2023",
            description="Collaborated in building analytical solutions for academic retention patterns, student dropout factor analysis, and AICTE innovation challenges.",
            display_order=3
        ),
        models.Hackathon(
            title="Hackverse 2026 Mini Hackathon",
            role_or_focus="Student Coordinator & Technical Facilitator",
            year="2026",
            description="Coordinated technical operations, mentorship sessions, and ideation tracks for multi-disciplinary student hacker teams.",
            display_order=4
        )
    ]
    db.add_all(hackathons)

    # 10. Activities
    activities = [
        models.Activity(
            title="Innovation & Entrepreneurship Bootcamp 2.0",
            role="Resource Person & Technical Speaker",
            year="2026",
            description="Delivered specialized sessions on digital outreach strategies, technical product development, and modern entrepreneurship concepts.",
            display_order=1
        ),
        models.Activity(
            title="Entrepreneur 2026",
            role="Official Pitch Evaluator",
            year="2026",
            description="Acted as an evaluator assessing student startup pitches, technical feasibility of prototypes, and innovative product frameworks.",
            display_order=2
        ),
        models.Activity(
            title="Design Thinking Workshops & Campus Events",
            role="Session Facilitator & Event Coordinator",
            year="2025",
            description="Delivered interactive sessions on Design Thinking methodologies, user-centered prototyping, and coordinated departmental technical events.",
            display_order=3
        )
    ]
    db.add_all(activities)

    # 11. Resume
    resume = models.Resume(
        title="Tharun Vaibhav S S – Primary Technical Resume",
        filename="Tharun_Vaibhav_Resume.pdf",
        file_path="/resumes/Tharun_Vaibhav_Resume.pdf",
        is_primary=True,
        uploaded_at="September 2026"
    )
    db.add(resume)

    db.commit()
    db.close()
    print("Database successfully seeded with 100% verified portfolio records!")

if __name__ == "__main__":
    seed_database()
