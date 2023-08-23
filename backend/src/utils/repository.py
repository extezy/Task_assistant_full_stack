import uuid
from abc import ABC, abstractmethod
from sqlalchemy import insert, select, update
from sqlalchemy.ext.asyncio import AsyncSession


class AbstractRepository(ABC):
    model = None

    @abstractmethod
    async def get_all(self):
        raise NotImplemented

    @abstractmethod
    async def add_one(self, *args, **kwargs):
        raise NotImplemented

    @abstractmethod
    async def get_one(self):
        raise NotImplemented

    @abstractmethod
    async def put_one(self, *args, **kwargs):
        raise NotImplemented

    @abstractmethod
    async def delete_one(self):
        raise NotImplemented


class SQLAlchemyRepository(AbstractRepository):
    model = None

    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_all(self, **filter_by):
        query = select(self.model).filter_by(**filter_by)
        result = await self.session.execute(query)
        return result.scalars().all()

    async def add_one(self, data: dict) -> uuid.UUID:
        statement = insert(table=self.model).values(**data).returning(self.model.id)
        result = await self.session.execute(statement=statement)
        return result.scalar_one()

    async def get_one(self, **unique):
        query = select(self.model).filter_by(**unique)
        result = await self.session.execute(query)
        return result.scalar_one()

    async def put_one(self, unique: dict, values: dict):
        query = select(self.model).filter_by(**unique)
        get_task = await self.session.execute(query)
        model_object = get_task.scalar_one()

        if not model_object:
            return None
        statement = (
            update(self.model)
            .filter_by(**unique)
            .values(**values)
        )

        await self.session.execute(statement)
        return {"detail": "Updated"}

    async def delete_one(self, **filter_by):
        query = select(self.model).filter_by(**filter_by)
        response = await self.session.execute(query)
        model_object = response.scalar_one()

        if not model_object:
            return None

        await self.session.delete(model_object)
        return {"detail": "Deleted"}
