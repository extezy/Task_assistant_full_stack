from httpx import AsyncClient


async def test_crud_tasks(ac: AsyncClient):

    response = await ac.post("/api/auth/register", json={
        "email": "user@example.com",
        "password": "string",
        "is_active": True,
        "is_superuser": False,
        "is_verified": False,
        "nickname": "nick",
        "first_name": "first",
        "last_name": "last"
    })

    assert 201 == response.status_code

    response = await ac.post("/api/auth/login", data={
        "username": "authuser@example.com",
        "password": "string"
    })

    login_data = response.json()
    token = login_data["access_token"]

    ac.headers = {"Authorization": f"Bearer {token}", "accept": "application/json"}

    response = await ac.post("/api/task/", json={
        "info": "string",
        "expired_time": "2023-09-01T22:53:54.961307",
        "status": "In progress",
        "priority": "High"
    })
    result = response.json()
    task_id = result['data']
    assert 200 == result['status']

    response = await ac.get(f"/api/task/{task_id}")
    assert 200 == response.status_code

    response = await ac.put(f"/api/task/{task_id}", json={
        "info": "new_string",
        "expired_time": "2023-09-01T22:53:54.961307",
        "status": "In progress",
        "priority": "High"
    })
    assert 200 == response.status_code

    response = await ac.get(f"/api/task/")
    assert 200 == response.status_code
    task_data = response.json()
    assert "new_string" == task_data["data"][0]["info"]

    response = await ac.delete(f"/api/task/{task_id}")

    assert 200 == response.status_code

    response = await ac.get(f"/api/task/{task_id}")
    assert 404 == response.status_code
