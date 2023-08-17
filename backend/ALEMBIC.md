# memo-assistant

Для накатывания миграций, если файла almbic.ini ещё нет, нужно  запустить в  терминале  команду:
```commandline
alembic init migrations
```
После этого будет создана папка с  миграциями  и конфигурационный файл  для  alembic.

В ```alembic.ini``` нужно задать адрес базы данных,  в которую будем катать миграции.

Дальше идем в папку с миграциями и открываем env.py, там вносим изменения в блок,  где  написано
```commandline
from myapp import Base
target_metadata=Base.metadata

```
Далее в консоли: ```alembic revision --autogenerate -m "Initial"```
Будет создана миграция, проверяем её на корректность
Далее вводим: бновление до  последней ```alembic upgrade head``` 
или ``` alembic upgrade 'revision_version'```