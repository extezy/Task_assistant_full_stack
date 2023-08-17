import uuid

from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from src.auth.models import User
from src.tasks.models import Task
from sqlalchemy import select, insert, update
from src.auth.config import current_active_user
from src.tasks.schemas import TaskCreate, TaskPut
from src.session import get_async_session

tasks_auth_router = APIRouter(prefix="/task",  tags=["Task"])


@tasks_auth_router.post("/")
async def add_user_task(
        new_task: TaskCreate,
        session: AsyncSession = Depends(get_async_session),
        user: User = Depends(current_active_user),
):
    """ Post task function"""
    try:
        new_task.user_id = user.id

        statement = insert(table=Task).values(**new_task.model_dump())
        await session.execute(statement=statement)
        await session.commit()

        return {
            'status': 200,
            "data": None,
            'detail': 'Created'
        }
    except Exception as e:
        return {
            "status": "Error",
            "data": None,
            "detail": e
        }


@tasks_auth_router.delete("/{task_id}")
async def delete_user_task(
        task_id: uuid.UUID,
        session: AsyncSession = Depends(get_async_session),
        user: User = Depends(current_active_user),
):
    """ Delete task function"""
    try:
        query = select(Task).where(Task.id == task_id).where(Task.user_id == user.id)
        response = await session.execute(query)
        task = response.scalars().first()

        if not task:
            raise HTTPException(status_code=404, detail='Task not found')

        await session.delete(task)

        await session.commit()

        return {
            'status': 200,
            "data": None,
            'detail': 'Deleted'
            }
    except Exception as e:
        return {
            "status": "Error",
            "data": None,
            "detail": e
        }


@tasks_auth_router.get("/")
async def get_all_user_tasks(
        session: AsyncSession = Depends(get_async_session),
        user: User = Depends(current_active_user)
):
    """ Get tasks function"""
    try:
        query = select(Task).where(Task.user_id == user.id)
        result = await session.execute(query)

        return {
            "status": "Success",
            "data": result.scalars().all(),
            "detail": None
        }
    except Exception as e:
        return {
            "status": "Error",
            "data": None,
            "detail": e
        }


@tasks_auth_router.put("/{task_id}")
async def update_user_task(
        task_id: uuid.UUID,
        updated_task: TaskPut,
        session: AsyncSession = Depends(get_async_session),
        user: User = Depends(current_active_user),
):
    """ Patch task function"""
    try:
        query = select(Task).where(Task.id == task_id).where(Task.user_id == user.id)
        get_task = await session.execute(query)
        task = get_task.scalars().first()
        if not task:
            raise HTTPException(status_code=404, detail='Task not found')
        statement = (
            update(Task)
            .values(
                info=updated_task.info,
                expired_time=updated_task.expired_time,
                priority=updated_task.priority,
                status=updated_task.status
            )
            .where(Task.id == task_id)
        )

        await session.execute(statement)

        await session.commit()
        return {
            "status": 200,
            "data": None,
            "detail": "Updated"
        }

    except Exception as e:
        return {
            "status": "Error",
            "data": None,
            "detail": e
        }
