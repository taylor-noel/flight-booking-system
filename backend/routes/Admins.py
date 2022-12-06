from fastapi import APIRouter
from config.db import conn
from models.models import admin
from schemas.index import Admin
from datetime import date
from sqlalchemy.sql import text


admins = APIRouter()

# Get all Admins
@admins.get("/getAdmins")
async def getAdmins():
    return conn.execute(admin.select()).fetchall()

# Get all Admin Emails
@admins.get("/getAdminEmails")
async def getAdminEmails():
    s = text("select email from admin")
    return conn.execute(s).fetchall()


# select admin by email
@admins.get("/selectAdmin{email}")
async def selectAdmin(email: str):
    return conn.execute(admin.select().where(admin.c.email == email)).first()


# create new admin
@admins.post("/createAdmin")
async def createAdmin(email: str, password: str):
    conn.execute(admin.insert().values(
        email = admins.email,
        password = admins.password
    ))
    return conn.execute(admin.select()).fetchall()

# update admin
@admins.put("/updateAdmin{email}")
async def updateAdmin(email: str, password: str):
    conn.execute(admin.update().values(
        password = admins.password
    ).where(admin.c.email == email))
    return conn.execute(admin.select()).fetchall()

# delete admin
@admins.delete("/deleteAdmin{email}")
async def deleteAdmin(email: str):
    conn.execute(admin.delete().where(admin.c.email == email))
    return conn.execute(admin.select()).fetchall()

