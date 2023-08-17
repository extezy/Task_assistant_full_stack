import uuid

from fastapi import APIRouter
from fastapi_users import FastAPIUsers
from src.auth.config import auth_backend
from src.auth.utils import User
from src.auth.manager import get_user_manager
from src.auth.schemas import UserRead, UserCreate

fastapi_users = FastAPIUsers[User, uuid.UUID](
    get_user_manager,
    [auth_backend],
)

auth_api_router = APIRouter(prefix="/auth",  tags=["Auth"])

auth_api_router.include_router(fastapi_users.get_auth_router(auth_backend))
auth_api_router.include_router(fastapi_users.get_register_router(UserRead, UserCreate))
auth_api_router.include_router(fastapi_users.get_reset_password_router())
