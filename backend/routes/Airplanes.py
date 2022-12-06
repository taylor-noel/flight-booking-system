from fastapi import APIRouter
from config.db import conn
from models.models import airplane
from schemas.index import Airplane
from datetime import date
from sqlalchemy.sql import text


airplanes = APIRouter()

## get all airplanes
@airplanes.get("/getAirplanes")
async def getAirplanes():
    return conn.execute(airplane.select()).fetchall()

 ## Get all airplane model names
@airplanes.get("/getAirplaneModels")
async def getAirplaneModels():
    s = text("select airplane.model, airplane_carrier.name from airplane join airplane_carrier on airplane.carrier_id = airplane_carrier.id")
    return conn.execute(s).fetchall()

## select for one airplane by id
@airplanes.get("/selectAirplane{id}")
async def selectAirplane(id: int):
    return conn.execute(airplane.select().where(airplane.c.id == id)).first()

## create new airplane
@airplanes.put("/createAirplane")
async def createAirplane(id: int, model: str, rows : int, seats_per_row: int, carrier_id: int):
    s = text("insert into airplane (id, model, rows, seats_per_row, carrier_id) values (:id, :model, :rows, :seats_per_row, :carrier_id)")
    return conn.execute(s, id = id, model = model, rows = rows, seats_per_row = seats_per_row, carrier_id = carrier_id)

## update airplane
@airplanes.post("/updateAirplane{id}")
async def updateAirplane(id: int, model: str, rows : int, seats_per_row: int, carrier_id: int):
    s = text("update airplane set model = :model, rows = :rows, seats_per_row = :seats_per_row, carrier_id = :carrier_id where id = :id")
    return conn.execute(s, id = id, model = model, rows = rows, seats_per_row = seats_per_row, carrier_id = carrier_id)
## delete airplane
@airplanes.delete("/deleteAirplane{id}")
async def deleteAirplane(id: int):
    conn.execute(airplane.delete().where(airplane.c.id == id))
    return conn.execute(airplane.select()).fetchall()
