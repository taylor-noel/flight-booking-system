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

@airplanes.get("/getAirplanesFormatted")
async def getAirplanesFormatted():
    s = text("select airplane.id,model,rowss, seats_per_row, carrier.name as carrier_name from airplane join airplane_carrier as carrier on carrier.id = carrier_id")
    return conn.execute(s).fetchall()
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
async def createAirplane(id: int, model: str, rowss : int, seats_per_row: int, carrier_name: str):
    s = text("select id from airplane_carrier where name = :x")
    carrier_id = conn.execute(s, x=carrier_name).first()
    s1 = text("insert into airplane (id, model, rowss, seats_per_row, carrier_id) values (:id, :model, :rowss, :seats_per_row, :carrier_id)")
    conn.execute(s1, id = id, model = model, rowss = rowss, seats_per_row = seats_per_row, carrier_id = carrier_id[0])
    s2 = text("select airplane.id,model,rowss, seats_per_row, carrier.name as carrier_name from airplane join airplane_carrier as carrier on carrier.id = carrier_id")
    return conn.execute(s2).fetchall()


## update airplane
@airplanes.post("/updateAirplane")
async def updateAirplane(id: int, model: str, rowss : int, seats_per_row: int, carrier_name: str):
    s = text("select id from airplane_carrier where name = :x")
    carrier_id = conn.execute(s, x=carrier_name).first()
    s1 = text("update airplane set model = :model, rowss = :rowss, seats_per_row = :seats_per_row, carrier_id = :carrier_id where id = :id")
    conn.execute(s1, id = id, model = model, rowss = rowss, seats_per_row = seats_per_row, carrier_id = carrier_id[0])
    s2 = text("select airplane.id,model,rowss, seats_per_row, carrier.name as carrier_name from airplane join airplane_carrier as carrier on carrier.id = carrier_id")
    return conn.execute(s2).fetchall()
## delete airplane
@airplanes.delete("/deleteAirplane{id}")
async def deleteAirplane(id: int):
    conn.execute(airplane.delete().where(airplane.c.id == id))
    s = text("select airplane.id,model,rowss, seats_per_row, carrier.name as carrier_name from airplane join airplane_carrier as carrier on carrier.id = carrier_id")
    return conn.execute(s).fetchall()
