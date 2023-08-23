import uuid

from src.utils.unitofwork import IUnitOfWork
from src.api.api_v1.tasks.schemas import TaskCreateSchema, TaskPutSchema


class TaskService:
    async def get_all_by_user_id(self, uow: IUnitOfWork,  user_id: uuid.UUID):
        async with uow:
            result = [task.to_dict() for task in await uow.tasks.get_all(user_id=user_id)]
            return result

    async def get_one_by_id(self, uow: IUnitOfWork, task_id: uuid.UUID, user_id: uuid.UUID):
        async with uow:
            task = await uow.tasks.get_one(id=task_id, user_id=user_id)
            return task.to_dict()

    async def add_user_task(self, uow: IUnitOfWork, user_id: uuid.UUID, data: dict):
        async with uow:
            data["user_id"] = user_id
            new_task = TaskCreateSchema(**data)
            result = await uow.tasks.add_one(data=new_task.model_dump())
            await uow.commit()
            return result

    async def delete_user_task(self, uow: IUnitOfWork, user_id: uuid.UUID, task_id: uuid.UUID):
        async with uow:
            result = await uow.tasks.delete_one(user_id=user_id, id=task_id)
            await uow.commit()
            return result

    async def update_user_task(self, uow: IUnitOfWork, updated_task: TaskPutSchema, user_id: uuid.UUID, task_id: uuid.UUID):
        async with uow:
            updated_task.user_id = user_id
            result = await uow.tasks.put_one({"id": f"{task_id}"}, updated_task.model_dump())
            await uow.commit()
            return result
