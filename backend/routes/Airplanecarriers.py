from fastapi import APIRouter
from config.db import conn
from models.models import airplane_carrier
from schemas.index import AirplaneCarrier
from datetime import date
from sqlalchemy.sql import text



airplanecarriers = APIRouter()

## Get all airplanecarriers
@airplanecarriers.get("/getAirplaneCarriers")
async def getAirplaneCarriers():
    return conn.execute(airplane_carrier.select()).fetchall()

## Get all airplanecarriers names
@airplanecarriers.get("/getAirplaneCarrierNames")
async def getAirplaneCarrierNames():
    s = text("select airplane_carrier.name from airplane_carrier")
    return conn.execute(s).fetchall()

## select airplanecarrier by id
@airplanecarriers.get("/selectAirplaneCarrier{id}")
async def selectAirplaneCarrier(id: int):
    return conn.execute(airplane_carrier.select().where(airplane_carrier.c.id == id)).first()


## create new airplane carrier
@airplanecarriers.put("/createAirplaneCarrier")
async def createAirplaneCarrier(id: int, email: str, address: str, phone: str, name: str):
    s = text("insert into airplane_carrier (id, email, address, phone, name) values (:id, :email, :address, :phone, :name)")
    return conn.execute(s, id = id, email = email, address = address, phone = phone, name = name)
## update airplane carrier
@airplanecarriers.post("/updateAirplaneCarrier{id}")
async def updateAirplaneCarrier(id: int, email: str, address: str, phone: str, name: str):
    s = text("update airplane_carrier set email = :email, address = :address, phone = :phone, name = :name where id = :id")
    return conn.execute(s, id = id, email = email, address = address, phone = phone, name = name)

## delete airplane carrier
@airplanecarriers.delete("/deleteAirplaneCarrier{id}")
async def deleteAirplaneCarrier(id: int):
    conn.execute(airplane_carrier.delete().where(airplane_carrier.c.id == id))
    return conn.execute(airplane_carrier.select()).fetchall()


