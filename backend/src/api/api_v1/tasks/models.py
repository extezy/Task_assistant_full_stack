from datetime import datetime
import uuid
from sqlalchemy import Column, String, TIMESTAMP, ForeignKey, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from src.db.base_class import Base
from src.api.api_v1.tasks.schemas import TaskPriority, TaskStatus


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

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "info": self.info,
            "created_at": self.created_at,
            "expired_time": self.expired_time,
            "priority": self.priority,
            "status": self.status,
        }
