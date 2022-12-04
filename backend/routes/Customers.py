from fastapi import APIRouter
from config.db import conn
from models.models import customer
from schemas.index import Customer
from datetime import date
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
@customers.post("/createCustomer")
async def createCustomer(passport_number: str, phone: str, email: str, fname: str, lname: str, credit_card_number: int, credit_card_csc: int, credit_card_expiry: date, credit_card_name: str):
     conn.execute(customer.insert().values(
         passport_number = customers.passport_number,
            phone = customers.phone,
            email = customers.email,
            fname = customers.fname,
            lname = customers.lname,
            credit_card_number = customers.credit_card_number,
            credit_card_csc = customers.credit_card_csc,
            credit_card_expiry = customers.credit_card_expiry,
            credit_card_name = customers.credit_card_name
        ))
     return conn.execute(customer.select()).fetchall()

# Update Customer
@customers.put("/updateCustomer{passport_number}")
async def updateCustomer(passport_number: str, phone: str, email: str, fname: str, lname: str, credit_card_number: int, credit_card_csc: int, credit_card_expiry: date, credit_card_name: str):
    conn.execute(customer.update().values(
        phone = customers.phone,
        email = customers.email,
        fname = customers.fname,
        lname = customers.lname,
        credit_card_number = customers.credit_card_number,
        credit_card_csc = customers.credit_card_csc,
        credit_card_expiry = customers.credit_card_expiry,
        credit_card_name = customers.credit_card_name
    ).where(customer.c.passport_number == passport_number))
    return conn.execute(customer.select()).fetchall()

# Delete Customer
@customers.delete("/deleteCustomer{passport_number}")
async def deleteCustomer(passport_number: str):
    conn.execute(customer.delete().where(customer.c.passport_number == passport_number))
    return conn.execute(customer.select()).fetchall()