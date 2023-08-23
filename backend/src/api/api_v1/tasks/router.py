import uuid

from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException
from fastapi.responses import JSONResponse
from src.api.api_v1.auth.models import User
from src.api.api_v1.auth.config import current_active_user
from src.api.api_v1.tasks.schemas import TaskPutSchema
from src.api.api_v1.tasks.service import TaskService
from src.api.dependencies.dependencies import UOWDep
from sqlalchemy.exc import NoResultFound
tasks_auth_router = APIRouter(prefix="/task",  tags=["Task"])


@tasks_auth_router.get("/")
async def get_all_user_tasks(
        user: User = Depends(current_active_user),
        uow: UOWDep = None,
):
    """ Get all tasks """
    try:
        tasks = await TaskService().get_all_by_user_id(uow=uow, user_id=user.id)

        return {
            "status": "Success",
            "data": tasks,
            "detail": None
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail={
            "status": "Error",
            "data": None,
            "detail": str(e)
        })


@tasks_auth_router.get("/{task_id}")
async def get_task_by_id(
        task_id: uuid.UUID,
        user: User = Depends(current_active_user),
        uow: UOWDep = None,
):
    """ Get task by id"""
    try:
        task = await TaskService().get_one_by_id(uow=uow, task_id=task_id, user_id=user.id)

        return {
            "status": "Success",
            "data": task,
            "detail": None
        }
    except NoResultFound as e:
        raise HTTPException(status_code=404, detail={
            "status": "Error",
            "data": None,
            "detail": str(e)
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail={
            "status": "Error",
            "data": None,
            "detail": str(e)
        })


@tasks_auth_router.post("/")
async def add_user_task(
        data: dict,
        user: User = Depends(current_active_user),
        uow: UOWDep = None,
):
    """ Post task """
    try:
        result = await TaskService().add_user_task(uow=uow, user_id=user.id, data=data)
        return JSONResponse(
            {
                'status': 200,
                "data": str(result),
                'detail': 'Created'
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail={
            "status": "Error",
            "data": None,
            "detail": str(e)
        })


@tasks_auth_router.delete("/{task_id}")
async def delete_user_task(
        task_id: uuid.UUID,
        user: User = Depends(current_active_user),
        uow: UOWDep = None,
):
    """ Delete task """
    try:
        result = await TaskService().delete_user_task(uow=uow, user_id=user.id, task_id=task_id)
        if result:
            return {
                'status': 200,
                "data": None,
                'detail': result["detail"]
                }
    except Exception as e:
        raise HTTPException(status_code=500, detail={
            "status": "Error",
            "data": None,
            "detail": str(e)
        })


@tasks_auth_router.put("/{task_id}")
async def update_user_task(
        task_id: uuid.UUID,
        updated_task: TaskPutSchema,
        user: User = Depends(current_active_user),
        uow: UOWDep = None
):
    """ Put task function"""
    try:
        result = await TaskService().update_user_task(
            uow=uow,
            updated_task=updated_task,
            user_id=user.id,
            task_id=task_id
        )

        if not result:
            return HTTPException(status_code=404, detail="Not found task")
        return {
            "status": 200,
            "data": None,
            "detail": "Updated"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail={
            "status": "Error",
            "data": None,
            "detail": str(e)
        })
