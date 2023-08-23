import uuid

from fastapi import APIRouter
from fastapi_users import FastAPIUsers
from src.api.api_v1.auth.config import auth_backend
from src.api.api_v1.auth.utils import User
from src.api.api_v1.auth.manager import get_user_manager
from src.api.api_v1.auth.schemas import UserRead, UserCreate, UserUpdate

fastapi_users = FastAPIUsers[User, uuid.UUID](
    get_user_manager,
    [auth_backend],
)

auth_api_router = APIRouter(prefix="/auth",  tags=["Auth"])

auth_api_router.include_router(fastapi_users.get_auth_router(auth_backend))
auth_api_router.include_router(fastapi_users.get_register_router(UserRead, UserCreate))
auth_api_router.include_router(fastapi_users.get_reset_password_router())


users_api_router = APIRouter(prefix="/users",  tags=["Users"])
users_api_router.include_router(fastapi_users.get_users_router(UserRead, UserUpdate))
