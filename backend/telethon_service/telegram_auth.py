from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from telethon.sync import TelegramClient
from telethon.sessions import StringSession

import asyncio

# ================= CONFIG =================
api_id = 12345678
api_hash = "YOUR_API_HASH"

# ================= APP =================
app = FastAPI()

# ================= CORS =================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================= STORE CLIENTS =================
clients = {}

# ================= REQUEST MODELS =================
class PhoneRequest(BaseModel):
    phone: str

class VerifyRequest(BaseModel):
    phone: str
    code: str

# ================= SEND OTP =================
@app.post("/send-otp")
async def send_otp(data: PhoneRequest):

    try:

        phone = data.phone

        client = TelegramClient(
            StringSession(),
            api_id,
            api_hash
        )

        await client.connect()

        result = await client.send_code_request(phone)

        clients[phone] = {
            "client": client,
            "phone_code_hash":
            result.phone_code_hash
        }

        return {
            "success": True,
            "message": "OTP Sent"
        }

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }

# ================= VERIFY OTP =================
@app.post("/verify-otp")
async def verify_otp(data: VerifyRequest):

    try:

        phone = data.phone
        code = data.code

        stored = clients.get(phone)

        if not stored:
            return {
                "success": False,
                "message": "Send OTP First"
            }

        client = stored["client"]

        await client.sign_in(
            phone=phone,
            code=code,
            phone_code_hash=
            stored["phone_code_hash"]
        )

        me = await client.get_me()

        return {
            "success": True,
            "user": {
                "id": me.id,
                "name": me.first_name,
                "phone": me.phone
            }
        }

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }