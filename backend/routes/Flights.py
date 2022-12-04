from fastapi import APIRouter
from config.db import conn
from models.models import flight
from schemas.index import Flight
from datetime import date, datetime

flights = APIRouter()

## GET ALL FLIGHTS
@flights.get("/getFlights")
async def getFlights():
    return conn.execute(flight.select()).fetchall()


##select flight by flight_number
@flights.get("/selectFlight{flight_number}")
async def selectFlight(flight_number: str):
    return conn.execute(flight.select().where(flight.c.flight_number == flight_number)).first()


##create new flight
@flights.post("/createFlight")
async def createFlight(flight_number : str , arrival_airport: int, departure_airport: int, airplane_id : int, departure_time : datetime, arrival_time : datetime):
    conn.execute(flight.insert().values(
        flight_number = flights.flight_number,
        arrival_airport = flights.arrival_airport,
        departure_airport = flights.departure_airport,
        airplane_id = flights.airplane_id,
        departure_time = flights.departure_time,
        arrival_time = flights.arrival_time
    ))
    return conn.execute(flight.select()).fetchall()


##update flight
@flights.put("/updateFlight{flight_number}")
async def updateFlight(flight_number : str , arrival_airport: int, departure_airport: int, airplane_id : int, departure_time : datetime, arrival_time : datetime):
    conn.execute(flight.update().values(
        flight_number = flights.flight_number,
        arrival_airport = flights.arrival_airport,
        departure_airport = flights.departure_airport,
        airplane_id = flights.airplane_id,
        departure_time = flights.departure_time,
        arrival_time = flights.arrival_time
    ).where(flight.c.flight_number == flight_number))
    return conn.execute(flight.select()).fetchall()


##delete flight
@flights.delete("/deleteFlight{flight_number}")
async def deleteFlight(flight_number: str):
    conn.execute(flight.delete().where(flight.c.flight_number == flight_number))
    return conn.execute(flight.select()).fetchall()
