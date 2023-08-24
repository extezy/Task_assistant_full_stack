from fastapi.routing import APIRouter
from fastapi import FastAPI
from src.api.api_v1.auth.router import auth_api_router, users_api_router
from src.api.api_v1.tasks.router import tasks_auth_router
from fastapi.middleware.cors import CORSMiddleware
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from redis import asyncio as aioredis
from src.settings import REDIS_PORT, REDIS_HOST


#  create instance  of  the app
app = FastAPI(title='memo-assistant',
              docs_url='/api/docs',
              redoc_url='/api/redoc',
              openapi_url='/api/openapi.json')

origins = [
   "http://localhost:8000",
   "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS", "DELETE", "PATCH", "PUT"],
    allow_headers=["Content-Type", "Set-Cookie", "Access-Control-Allow-Headers", "Access-Control-Allow-Origin",
                   "Authorization"],
)

# create the instance for  the  routes
main_api_router = APIRouter()

# # set  routes to the app instance
main_api_router.include_router(auth_api_router)
main_api_router.include_router(users_api_router)
main_api_router.include_router(tasks_auth_router)
app.include_router(main_api_router, prefix='/api')


@app.on_event("startup")
async def startup_event():
    redis = aioredis.from_url(f"redis://{REDIS_HOST}:{REDIS_PORT}", encodings="utf-8", deccode_responses=True)
    FastAPICache.init(RedisBackend(redis), prefix="fastapi-cache")
