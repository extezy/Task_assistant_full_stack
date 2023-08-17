from uuid import UUID

from typing import Optional
from datetime import datetime, timedelta
from pydantic import BaseModel
from src.tasks.models import TaskPriority, TaskStatus


class TaskCreate(BaseModel):
    user_id: Optional[UUID]
    info: str
    expired_time: Optional[datetime] = datetime.utcnow() + timedelta(weeks=2)
    status: TaskStatus = TaskStatus.in_progress
    priority: TaskPriority = TaskPriority.high


class TaskPut(BaseModel):
    info: str
    expired_time: datetime
    priority: TaskPriority
    status: TaskStatus
