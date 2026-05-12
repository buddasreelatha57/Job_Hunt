from telethon import TelegramClient, events
import requests
import config
import re

# =========================================
# TELEGRAM CLIENT
# =========================================

client = TelegramClient(
    "job_session",
    config.api_id,
    config.api_hash
)

# =========================================
# CHANNEL IDS
# =========================================

channels = [
    -1001918258764,
    -1002341993875,
    -1001798701992,
    -1001460350640,
    -1003809731683
]

# =========================================
# TITLE EXTRACT
# =========================================

def extract_title(text):

    lines = text.split("\n")

    ignore_words = [
        "apply now",
        "we are hiring",
        "job type",
        "location",
        "salary",
        "experience",
        "qualification",
        "batch",
        "eligibility"
    ]

    for line in lines:

        line = line.strip()

        if not line:
            continue

        if len(line) < 5:
            continue

        if any(
            word in line.lower()
            for word in ignore_words
        ):
            continue

        if "http" in line.lower():
            continue

        return line

    return "Job Opening"

# =========================================
# COMPANY
# =========================================

def extract_company(text):

    match = re.search(
        r"(company|at)\s*[:\-]?\s*(.+)",
        text,
        re.IGNORECASE
    )

    if match:
        return match.group(2).strip()

    return "Unknown Company"

# =========================================
# LOCATION
# =========================================

def extract_location(text):

    match = re.search(
        r"location\s*[:\-]?\s*(.+)",
        text,
        re.IGNORECASE
    )

    if match:
        return match.group(1).strip()

    if "remote" in text.lower():
        return "Remote"

    return "Not Specified"

# =========================================
# APPLY LINK
# =========================================

def extract_apply_link(text):

    urls = re.findall(
        r'(https?://[^\s]+)',
        text
    )

    for url in urls:

        if any(
            x in url.lower()
            for x in [
                "telegram",
                "youtube",
                "linkedin.com/feed"
            ]
        ):
            continue

        return url

    emails = re.findall(
        r'[\w\.-]+@[\w\.-]+\.\w+',
        text
    )

    if emails:
        return emails[0]

    return "#"

# =========================================
# ROLE
# =========================================

def extract_role(text):

    match = re.search(
        r"(role|position)\s*[:\-]?\s*(.+)",
        text,
        re.IGNORECASE
    )

    if match:
        return match.group(2).strip()

    return extract_title(text)

# =========================================
# QUALIFICATION
# =========================================

def extract_qualification(text):

    match = re.search(
        r"(qualification|degree|education)\s*[:\-]?\s*(.+)",
        text,
        re.IGNORECASE
    )

    if match:
        return match.group(2).strip()

    return "Any Graduate"

# =========================================
# BATCH
# =========================================

def extract_batch(text):

    match = re.search(
        r"(batch|yop|year of passing)\s*[:\-]?\s*(.+)",
        text,
        re.IGNORECASE
    )

    if match:
        return match.group(2).strip()

    return "2024 - 2026"

# =========================================
# EXPERIENCE
# =========================================

def extract_experience(text):

    match = re.search(
        r"(\d+\+?\s*(years|year|yrs|yr))",
        text,
        re.IGNORECASE
    )

    if match:
        return match.group(1)

    if "fresher" in text.lower():
        return "Fresher"

    return "Not Specified"

# =========================================
# ATS DESCRIPTION
# =========================================

def build_ats_description(title, text):

    keywords = [
        "python",
        "java",
        "react",
        "node",
        "sql",
        "aws",
        "docker",
        "cloud",
        "devops"
    ]

    found_skills = []

    for skill in keywords:

        if skill.lower() in text.lower():
            found_skills.append(skill.upper())

    skills = ", ".join(found_skills)

    ats = f"""
Job Title: {title}

Key Skills:
{skills if skills else "Not Mentioned"}

Responsibilities:
- Work on real projects
- Team collaboration
- Build scalable applications
- Learn industry tools

Job Details:
{text[:500]}
    """

    return ats.strip()

# =========================================
# PARSE JOB
# =========================================

def parse_job(text):

    job = {

        "job_title":
            extract_title(text),

        "employer_name":
            extract_company(text),

        "job_city":
            extract_location(text),

        "job_type":
            "remote"
            if "remote" in text.lower()
            else "onsite",

        "job_role":
            extract_role(text),

        "qualification":
            extract_qualification(text),

        "batch":
            extract_batch(text),

        "experience":
            extract_experience(text),

        "salary":
            "Not Disclosed",

        "job_apply_link":
            extract_apply_link(text)
    }

    return job

# =========================================
# TELEGRAM MESSAGE EVENT
# =========================================

@client.on(events.NewMessage(chats=channels))
async def handler(event):

    text = event.raw_text

    if not text:
        return

    if len(text.strip()) < 20:
        return

    print("\n📩 NEW JOB MESSAGE\n")

    print(text)

    job = parse_job(text)

    # =====================================
    # DESCRIPTION
    # =====================================

    if len(text) < 100:

        description = build_ats_description(
            job["job_title"],
            text
        )

    else:

        description = text

    print("\n✅ PARSED JOB\n")

    print(job)

    # =====================================
    # SEND TO BACKEND
    # =====================================

    try:

        response = requests.post(
            "http://127.0.0.1:5000/api/jobs",
            json={

                "job_title":
                    job["job_title"],

                "employer_name":
                    job["employer_name"],

                "job_city":
                    job["job_city"],

                "job_type":
                    job["job_type"],

                "job_role":
                    job["job_role"],

                "qualification":
                    job["qualification"],

                "batch":
                    job["batch"],

                "experience":
                    job["experience"],

                "salary":
                    job["salary"],

                "job_apply_link":
                    job["job_apply_link"],

                "job_description":
                    description
            }
        )

        print(
            "🚀 SENT TO BACKEND:",
            response.status_code
        )

    except Exception as e:

        print("❌ ERROR:", e)

# =========================================
# START
# =========================================

client.start()

print("🚀 AI TELEGRAM JOB BOT RUNNING...")

client.run_until_disconnected()