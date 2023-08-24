import uuid
import redis.asyncio
from fastapi_users import FastAPIUsers
from fastapi_users.authentication import BearerTransport
from fastapi_users.authentication import AuthenticationBackend, RedisStrategy
from src.api.api_v1.auth.models import User
from src.api.api_v1.auth.manager import get_user_manager
from src.settings import REDIS_HOST, REDIS_PORT


# transport
bearer_transport = BearerTransport(tokenUrl="auth/login")
# Strategy
redis = redis.asyncio.from_url(f"redis://{REDIS_HOST}:{REDIS_PORT}", decode_responses=True)


def get_redis_strategy() -> RedisStrategy:
    return RedisStrategy(redis, lifetime_seconds=259200)


auth_backend = AuthenticationBackend(
    name="bearer",
    transport=bearer_transport,
    get_strategy=get_redis_strategy,
)

fastapi_users = FastAPIUsers[User, uuid.UUID](get_user_manager, [auth_backend])

current_active_user = fastapi_users.current_user(active=True)
