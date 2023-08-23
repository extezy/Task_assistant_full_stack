import uuid
from fastapi import Depends, Request
from fastapi_users import BaseUserManager, UUIDIDMixin
from typing import Optional
from .utils import User, get_user_db
from src.celery.celery_tasks import send_email_async
from src.settings import AUTH_SECRET


class UserManager(UUIDIDMixin, BaseUserManager[User, uuid.UUID]):
    reset_password_token_secret = AUTH_SECRET
    verification_token_secret = AUTH_SECRET

    # async def on_after_register(self, user: User, request: Optional[Request] = None):
    #     print(f"User {user.id} has registered.")
    #

    # TODO send email with link  for reset password
    async def on_after_forgot_password(
        self, user: User, token: str, request: Optional[Request] = None
    ):
        result = send_email_async.delay(email=user.email, token=token, name=f"{user.first_name}+ +{user.last_name}")
        return result
    #
    # async def on_after_request_verify(
    #     self, user: User, token: str, request: Optional[Request] = None
    # ):
    #     print(f"Verification requested for user {user.id}. Verification token: {token}")

 
async def get_user_manager(user_db=Depends(get_user_db)):
    yield UserManager(user_db)
