from src.celery.celery_app import celery
from fastapi_mail import FastMail, MessageSchema, MessageType
from pydantic import EmailStr, BaseModel
from typing import List
from starlette.responses import JSONResponse
from src.settings import mail_conf, RESET_PASSWORD_HOST


class EmailSchema(BaseModel):
    email: List[EmailStr]


@celery.task(acks_late=True)
def send_email_async(email: str, token: str, name: str) -> JSONResponse:
    html = f'<p>Hello {name}, for reset password, follow {RESET_PASSWORD_HOST}?token={token}</p> '

    message = MessageSchema(
        subject="Fastapi-Mail module",
        recipients=[email],
        body=html,
        subtype=MessageType.html)

    fm = FastMail(mail_conf)
    fm.send_message(message)

    return JSONResponse(status_code=200, content={"message": "email has been sent"})
