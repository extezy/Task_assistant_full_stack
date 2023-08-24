import uuid
from uuid import UUID
from typing import Optional
from datetime import datetime, timedelta
from pydantic import BaseModel
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


class TaskSchema(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    info: str
    created_at: datetime
    expired_time: datetime
    priority: TaskPriority
    status: TaskStatus


class TaskCreateSchema(BaseModel):
    user_id: Optional[uuid.UUID]
    info: str
    expired_time: Optional[datetime] = datetime.utcnow() + timedelta(weeks=2)
    status: TaskStatus = TaskStatus.in_progress
    priority: TaskPriority = TaskPriority.high


class TaskPutSchema(BaseModel):
    user_id: Optional[uuid.UUID] = None
    info: str
    expired_time: Optional[datetime] = None
    priority: TaskPriority
    status: TaskStatus
