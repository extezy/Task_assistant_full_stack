from fastapi_mail import FastMail, MessageSchema, MessageType
from pydantic import EmailStr, BaseModel
from typing import List
from starlette.responses import JSONResponse
from src.settings import mail_conf


class EmailSchema(BaseModel):
    email: List[EmailStr]


async def send_email_async(email: str, token: str) -> JSONResponse:
    # TODO change url for prod
    html = f'<p>Hi this reset password mail, follow http://localhost:8000/auth?token={token}</p> '

    message = MessageSchema(
        subject="Fastapi-Mail module",
        recipients=[email],
        body=html,
        subtype=MessageType.html)

    fm = FastMail(mail_conf)
    await fm.send_message(message)

    return JSONResponse(status_code=200, content={"message": "email has been sent"})
