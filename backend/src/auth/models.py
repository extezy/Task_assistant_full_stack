from datetime import datetime
import uuid

from sqlalchemy import Column, String, Boolean, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID
from fastapi_users.db import SQLAlchemyBaseUserTableUUID
from src.db.base_class import Base


class User(SQLAlchemyBaseUserTableUUID, Base):
    """Table for users using in fastapi-users"""

    __tablename__ = 'user'

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    email = Column(String, nullable=False, unique=True, index=True)
    nickname = Column(String, unique=True, nullable=True)
    hashed_password = Column(String, nullable=False)
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    registered_at = Column(TIMESTAMP, default=datetime.utcnow)
    is_active = Column(Boolean(), default=True)
    is_superuser = Column(Boolean(), default=False)
    is_verified = Column(Boolean(), default=False)
    # tasks = relationship("Task", back_populates="owner")

#  TODO
    # username = Column(String, unique=True, nullable=True)
    # first_name = Column(String, nullable=False)
    # last_name = Column(String, nullable=False)
    # registered_at = Column(TIMESTAMP, default=datetime.utcnow)
