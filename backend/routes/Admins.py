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
@admins.put("/createAdmin")
async def createAdmin(emails: str, password: str):
    s = text("insert into admin (email, password) values (:emails, :password)")
    return conn.execute(s, emails = emails, password = password)


# update admin
@admins.post("/updateAdmin{email}")
async def updateAdmin(email: str, password: str):
    s = text("update admin set password = :password where email = :email")
    return conn.execute(s, email = email, password = password)

# delete admin
@admins.delete("/deleteAdmin{email}")
async def deleteAdmin(email: str):
    conn.execute(admin.delete().where(admin.c.email == email))
    return conn.execute(admin.select()).fetchall()

