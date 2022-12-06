from fastapi import APIRouter
from config.db import conn
from models.models import flight
from schemas.index import Flight
from datetime import date, datetime
from sqlalchemy.sql import text


flights = APIRouter()

## GET ALL FLIGHTS
@flights.get("/getFlights")
async def getFlights():
    s = text("select flight.flight_number, arrival.city as arrival_airport, departure.city as departure_airport, arrival_time, departure_time, airplane.model as airplane_id from flight join airport as arrival on arrival.id = flight.arrival_airport join airport as departure on departure.id = flight.departure_airport join airplane on airplane.id = flight.airplane_id")
    return conn.execute(s).fetchall()

## GET ALL FLIGHTS by search
@flights.get("/getFlightsBySearch/departure={departure}arrival={arrival}date={date}")
async def getFlightsBySearch(departure:str, arrival: str, date: str):
    s = text("select flight.flight_number, arrival.city as arrival_airport, departure.city as departure_airport, arrival_time, departure_time, airplane.model as airplane_id from flight join airport as arrival on arrival.id = flight.arrival_airport join airport as departure on departure.id = flight.departure_airport join airplane on airplane.id = flight.airplane_id where departure.name = :x and arrival.name = :y and CAST(departure_time as DATE) = :z")
    return conn.execute(s, x=departure, y=arrival, z=date).fetchall()


##select flight by flight_number
@flights.get("/selectFlight{flight_number}")
async def selectFlight(flight_number: str):
    s = text("select flight.flight_number, arrival.city as arrival_airport, departure.city as departure_airport, arrival_time, departure_time, airplane.model as airplane_id from flight join airport as arrival on arrival.id = flight.arrival_airport join airport as departure on departure.id = flight.departure_airport join airplane on airplane.id = flight.airplane_id where flight_number = :x")
    return conn.execute(s, x=flight_number).first()


##create new flight
@flights.post("/createFlight")
async def createFlight(flight_number : str , arrival_airport: str, departure_airport: str, airplane_model : str, departure_time : datetime, arrival_time : datetime, airline_carrier: str):
    s = text("select airplane.id from flight join airplane on airplane.model = :x join airline_carrier on airline_carrier.name = :y")
    airplane_id = conn.execute(s, x= airplane_model, y= airline_carrier).first()
    s1 = text("select airport.id from airport where airport.city = :x")
    departure_id = conn.execute(s1, x= departure_airport).first()
    arrival_id = conn.execute(s1, x= arrival_airport).first()   
    conn.execute(flight.insert().values(
        flight_number = flights.flight_number,
        arrival_airport = arrival_id,
        departure_airport = departure_id,
        airplane_id = airplane_id,
        departure_time = flights.departure_time,
        arrival_time = flights.arrival_time
    ))
    return conn.execute(flight.select()).fetchall()


##update flight
@flights.put("/updateFlight/{flight_number}")
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
@flights.delete("/deleteFlight/{flight_number}")
async def deleteFlight(flight_number: str):
    s = text("select flight.flight_number, arrival.city as arrival_airport, departure.city as departure_airport, arrival_time, departure_time, airplane.model as airplane_id from flight join airport as arrival on arrival.id = flight.arrival_airport join airport as departure on departure.id = flight.departure_airport join airplane on airplane.id = flight.airplane_id")
    conn.execute(flight.delete().where(flight.c.flight_number == flight_number))
    return conn.execute(s).fetchall()
