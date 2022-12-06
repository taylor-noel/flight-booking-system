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
@airplanes.post("/createAirplane")
async def createAirplane(id: int, model: str, rows : int, seats_per_row: int, carrier_id: int):
    conn.execute(airplane.insert().values(
        id = airplanes.id,
        model = airplanes.model,
        rows = airplanes.rows,
        seats_per_row = airplanes.seats_per_row,
        carrier_id = airplanes.carrier_id
    ))
    return conn.execute(airplane.select()).fetchall()

## update airplane
@airplanes.put("/updateAirplane{id}")
async def updateAirplane(id: int, model: str, rows : int, seats_per_row: int, carrier_id: int):
    conn.execute(airplane.update().values(
        model = airplanes.model,
        rows = airplanes.rows,
        seats_per_row = airplanes.seats_per_row,
        carrier_id = airplanes.carrier_id
    ).where(airplane.c.id == id))
    return conn.execute(airplane.select()).fetchall()

## delete airplane
@airplanes.delete("/deleteAirplane{id}")
async def deleteAirplane(id: int):
    conn.execute(airplane.delete().where(airplane.c.id == id))
    return conn.execute(airplane.select()).fetchall()
