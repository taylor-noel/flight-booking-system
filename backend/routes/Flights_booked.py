from fastapi import APIRouter
from config.db import conn
from models.models import flight_booked
from schemas.index import FlightBooked
from datetime import date
from sqlalchemy.sql import text
flightsbooked = APIRouter()


@flightsbooked.get("/getFlightsBooked")
async def getFlightsBooked():
    return conn.execute(flight_booked.select()).fetchall()

##select flight booked by passport_number
@flightsbooked.get("/selectFlightBooked{passport_number}")
async def selectFlightBooked(passport_number: str):
    return conn.execute(flight_booked.select().where(flight_booked.c.passport_number == passport_number)).first()

##create new flight booked
@flightsbooked.put("/createFlightBooked")
async def createFlightBooked(boarding_id: int , passport_number: str, flight_number : str):
    s = text("insert into flight_booked (boarding_id, passport_number, flight_number) values (:boarding_id, :passport_number, :flight_number)")
    return conn.execute(s, boarding_id = flightsbooked.boarding_id, passport_number = flightsbooked.passport_number, flight_number = flightsbooked.flight_number)

##update flight booked
@flightsbooked.post("/updateFlightBooked{passport_number}")
async def updateFlightBooked(boarding_id: int , passport_number: str, flight_number : str):
    s = text("update flight_booked set boarding_id = :boarding_id, passport_number = :passport_number, flight_number = :flight_number where passport_number = :passport_number")
    return conn.execute(s, boarding_id = flightsbooked.boarding_id, passport_number = flightsbooked.passport_number, flight_number = flightsbooked.flight_number)
##delete flight booked
@flightsbooked.delete("/deleteFlightBooked{passport_number}")
async def deleteFlightBooked(passport_number: str):
    conn.execute(flight_booked.delete().where(flight_booked.c.passport_number == passport_number))
    return conn.execute(flight_booked.select()).fetchall()