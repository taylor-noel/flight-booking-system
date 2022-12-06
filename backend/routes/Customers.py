from fastapi import APIRouter
from config.db import conn
from models.models import customer
from schemas.index import Customer
from datetime import date
from sqlalchemy.sql import text
customers = APIRouter()

## GET ALL CUSTOMERS
@customers.get("/getCustomers")
async def getCustomers():
    return conn.execute(customer.select()).fetchall()

#select for one customer by passport number
@customers.get("/selectCustomer{passport_number}")
async def selectCustomer(passport_number: str):
    return conn.execute(customer.select().where(customer.c.passport_number == passport_number)).first()

# Update Customer
@customers.put("/createCustomer")
async def createCustomer(passport_number: str, phone: str, email: str, fname: str, lname: str, credit_card_number: int, credit_card_csc: int, credit_card_expiry: date, credit_card_name: str):
    s = text("insert into customer (passport_number, phone, email, fname, lname, credit_card_number, credit_card_csc, credit_card_expiry, credit_card_name) values (:passport_number, :phone, :email, :fname, :lname, :credit_card_number, :credit_card_csc, :credit_card_expiry, :credit_card_name)")
    return conn.execute(s, passport_number = passport_number, phone = phone, email = email, fname = fname, lname = lname, credit_card_number = credit_card_number, credit_card_csc = credit_card_csc, credit_card_expiry = credit_card_expiry, credit_card_name = credit_card_name)
# Update Customer
@customers.post("/updateCustomer{passport_number}")
async def updateCustomer(passport_number: str, phone: str, email: str, fname: str, lname: str, credit_card_number: int, credit_card_csc: int, credit_card_expiry: date, credit_card_name: str):
    s = text("update customer set phone = :phone, email = :email, fname = :fname, lname = :lname, credit_card_number = :credit_card_number, credit_card_csc = :credit_card_csc, credit_card_expiry = :credit_card_expiry, credit_card_name = :credit_card_name where passport_number = :passport_number")
    return conn.execute(s, passport_number = passport_number, phone = phone, email = email, fname = fname, lname = lname, credit_card_number = credit_card_number, credit_card_csc = credit_card_csc, credit_card_expiry = credit_card_expiry, credit_card_name = credit_card_name)

# Delete Customer
@customers.delete("/deleteCustomer{passport_number}")
async def deleteCustomer(passport_number: str):
    conn.execute(customer.delete().where(customer.c.passport_number == passport_number))
    return conn.execute(customer.select()).fetchall()