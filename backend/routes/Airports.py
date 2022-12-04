from fastapi import APIRouter
from config.db import conn
from models.models import airport
from schemas.index import Airport
from datetime import date


airports = APIRouter()

## get all airports
@airports.get("/getAirports")
async def getAirports():
    return conn.execute(airport.select()).fetchall()

## select for one airport by id 
@airports.get("/selectAirport{id}")
async def selectAirport(id: int):
    return conn.execute(airport.select().where(airport.c.id == id)).first()

## create new airport
@airports.post("/createAirport")
async def createAirport(id: int, city: str, name: str, country: str):
    conn.execute(airport.insert().values(
        id = airports.id,
        city = airports.city,
        name = airports.name,
        country = airports.country
    ))
    return conn.execute(airport.select()).fetchall()

## update airport
@airports.put("/updateAirport{id}")
async def updateAirport(id: int, city: str, name: str, country: str):
    conn.execute(airport.update().values(
        city = airports.city,
        name = airports.name,
        country = airports.country
    ).where(airport.c.id == id))
    return conn.execute(airport.select()).fetchall()

## delete airport
@airports.delete("/deleteAirport{id}")
async def deleteAirport(id: int):
    conn.execute(airport.delete().where(airport.c.id == id))
    return conn.execute(airport.select()).fetchall()

