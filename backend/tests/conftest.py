import pytest
from typing import AsyncGenerator

from sqlalchemy import NullPool
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from src import settings
from src.main import app
from src.session import get_async_session
import asyncio
from src.db.base import Base
from fastapi.testclient import TestClient
from httpx import AsyncClient

from src.utils.unitofwork import UnitOfWork

#  create async engine for interactions  with test_db
engine_test = create_async_engine(settings.DATABASE_URL_TEST, poolclass=NullPool)

# create session for the interactions  with test_db
override_async_session_maker = sessionmaker(engine_test, class_=AsyncSession, expire_on_commit=True)

Base.metadata.bind = engine_test


async def override_get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with override_async_session_maker() as session:
        yield session


# ovverides for test database
class OverrideUnitOfWork(UnitOfWork):

    def __init__(self):
        super().__init__()
        self.session_factory = override_async_session_maker


app.dependency_overrides[get_async_session] = override_get_async_session
app.dependency_overrides[UnitOfWork] = OverrideUnitOfWork


# Create and after clear tables in test_db
@pytest.fixture(autouse=True, scope='session')
async def prepare_database():

    async with engine_test.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    async with engine_test.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)


@pytest.fixture(scope="session")
def event_loop():
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()


client = TestClient(app)


@pytest.fixture(scope='session')
async def ac() -> AsyncGenerator[AsyncClient, None]:
    async with AsyncClient(app=app, base_url="http://test") as ac:
        yield ac
