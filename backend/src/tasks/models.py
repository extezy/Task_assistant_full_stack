from datetime import datetime
import uuid
from sqlalchemy import Column, String, TIMESTAMP, ForeignKey, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from src.db.base_class import Base
import enum


class TaskStatus(enum.Enum):
    """Class for task status"""
    in_progress = "In progress"
    completed = "Completed"
    canceled = "Canceled"
    expired = "Expired"


class TaskPriority(enum.Enum):
    """Class for task priority"""
    high = "High"
    medium = "Medium"
    low = "Low"


class Task(Base):

    """Model for tasks"""

    __tablename__ = 'task'

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    user_id = Column(UUID, ForeignKey("user.id"))
    user = relationship("User", backref="tasks")
    info = Column(String, nullable=False)

    created_at = Column(TIMESTAMP(timezone=True), default=datetime.utcnow)
    expired_time = Column(TIMESTAMP(timezone=True), nullable=False)

    priority = Column(Enum(TaskPriority), nullable=False, default=TaskPriority.high)
    status = Column(Enum(TaskStatus), nullable=False, default=TaskStatus.in_progress)
