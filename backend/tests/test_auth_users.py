from httpx import AsyncClient


async def test_bad_register_values(ac: AsyncClient):
    response = await ac.post("/api/auth/register", json={
        "email": "1@example.com",
        "password": "asdf",
        "is_active": True,
        "is_superuser": False,
        "is_verified": False,
        "nickname": "herington",
        "first_name": "321",
        "last_name": "4321"
    })

    assert 422 == response.status_code


async def test_register(ac: AsyncClient):
    response = await ac.post("/api/auth/register",  json={
        "email": "authuser@example.com",
        "password": "string",
        "is_active": True,
        "is_superuser": False,
        "is_verified": False,
        "nickname": "name",
        "first_name": "first",
        "last_name": "last"
    })
    assert 201 == response.status_code

    data = response.json()
    assert data["first_name"] == "first"
    user_id = data["id"]

    response = await ac.get(f"/api/users/{user_id}")
    assert 401 == response.status_code


async def test_authenticate(ac: AsyncClient):
    response = await ac.post("/api/auth/login", data={
        "username": "user@example.com",
        "password": "password"
    })

    assert 400 == response.status_code

    response = await ac.post("/api/auth/login", data={
        "username": "authuser@example.com",
        "password": "string"
    })

    assert 200 == response.status_code

    login_data = response.json()
    token = login_data["access_token"]

    ac.headers = {
        "Authorization": f"Bearer {token}",
        "accept": "application/json",
    }
    assert login_data["token_type"] == "bearer"


async def test_forgot_password(ac: AsyncClient):
    response = await ac.get(f"/api/users/me")
    assert 200 == response.status_code
    user = response.json()
    assert "authuser@example.com" == user["email"]

    response = await ac.post(f"/api/auth/forgot-password", json={
        "email": "authuser@example.com"
    })

    assert 202 == response.status_code
