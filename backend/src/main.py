from fastapi.routing import APIRouter
import uvicorn
from fastapi import FastAPI
from src.auth.router import auth_api_router
from src.tasks.router import tasks_auth_router


#  create instance  of  the app
app = FastAPI(title='memo-assistant',
              docs_url='/api/docs',
              redoc_url='/api/redoc',
              openapi_url='/api/openapi.json')

# create the instance for  the  routes
main_api_router = APIRouter()

# # set  routes to the app instance
main_api_router.include_router(auth_api_router)
main_api_router.include_router(tasks_auth_router)
app.include_router(main_api_router, prefix='/api')


if __name__ == '__main__':
    # run src  on  the  host
    uvicorn.run("main:app", host="0.0.0.0", reload=True, port=8888)
