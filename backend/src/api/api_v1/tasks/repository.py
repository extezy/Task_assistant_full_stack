from src.utils.repository import SQLAlchemyRepository
from src.api.api_v1.tasks.models import Task


class TaskRepository(SQLAlchemyRepository):
    model = Task
