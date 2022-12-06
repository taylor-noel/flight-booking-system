from fastapi import APIRouter
from config.db import conn
from models.models import airport
from schemas.index import Airport
from datetime import date
from sqlalchemy.sql import text


airports = APIRouter()

## get all airports
@airports.get("/getAirports")
async def getAirports():
    return conn.execute(airport.select()).fetchall()

## get all airport cities
@airports.get("/getAirportCities")
async def getAirportCities():
    s = text("select airport.city from airport")
    return conn.execute(s).fetchall()

## select for one airport by id 
@airports.get("/selectAirport{id}")
async def selectAirport(id: int):
    return conn.execute(airport.select().where(airport.c.id == id)).first()

## create new airport
@airports.put("/createAirport")
async def createAirport(id: int, city: str, name: str, country: str):
    s = text("insert into airport (id, city, name, country) values (:id, :city, :name, :country)")
    return conn.execute(s, id = id, city = city, name = name, country = country)

## update airport
@airports.post("/updateAirport{id}")
async def updateAirport(id: int, city: str, name: str, country: str):
    s = text("update airport set city = :city, name = :name, country = :country where id = :id")
    return conn.execute(s, id = id, city = city, name = name, country = country)

## delete airport
@airports.delete("/deleteAirport{id}")
async def deleteAirport(id: int):
    conn.execute(airport.delete().where(airport.c.id == id))
    return conn.execute(airport.select()).fetchall()

