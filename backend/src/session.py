from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from src import settings


#  create async engine for interactions  with db
engine = create_async_engine(settings.DATABASE_URL, future=True, echo=True)

# create session for the interactions  with db
async_session_maker = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    """Dependency for getting async session"""
    try:
        session: AsyncSession = async_session_maker()
        yield session
    finally:
        await session.close()
