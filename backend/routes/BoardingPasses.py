from fastapi import APIRouter
from config.db import conn
from models.models import boarding_pass
from schemas.index import BoardingPass
from datetime import date
from sqlalchemy.sql import text


boardingpasses = APIRouter()

## get all boardingpasses
@boardingpasses.get("/getBoardingPasses")
async def getBoardingPasses():
    return conn.execute(boarding_pass.select()).fetchall()

## select for one boardingpass by id
@boardingpasses.get("/selectBoardingPass{id}")
async def selectBoardingPass(id: int):
    return conn.execute(boarding_pass.select().where(boarding_pass.c.id == id)).first()

## create new boardingpass
@boardingpasses.put("/createBoardingPass")
async def createBoardingPass(id : int , passport_number: str, flight_number: str, departure_gate: str, airplane_id : int, seat_letter: str, seat_number : int):
    s = text("insert into boarding_pass (id, passport_number, flight_number, departure_gate, airplane_id, seat_letter, seat_number) values (:id, :passport_number, :flight_number, :departure_gate, :airplane_id, :seat_letter, :seat_number)")
    return conn.execute(s, id = id, passport_number = passport_number, flight_number = flight_number, departure_gate = departure_gate, airplane_id = airplane_id, seat_letter = seat_letter, seat_number = seat_number)

## update boardingpass
@boardingpasses.post("/updateBoardingPass{id}")
async def updateBoardingPass(id : int , passport_number: str, flight_number: str, departure_gate: str, airplane_id : int, seat_letter: str, seat_number : int):
    s = text("update boarding_pass set passport_number = :passport_number, flight_number = :flight_number, departure_gate = :departure_gate, airplane_id = :airplane_id, seat_letter = :seat_letter, seat_number = :seat_number where id = :id")
    return conn.execute(s, id = id, passport_number = passport_number, flight_number = flight_number, departure_gate = departure_gate, airplane_id = airplane_id, seat_letter = seat_letter, seat_number = seat_number)
## delete boardingpass
@boardingpasses.delete("/deleteBoardingPass{id}")
async def deleteBoardingPass(id: int):
    conn.execute(boarding_pass.delete().where(boarding_pass.c.id == id))
    return conn.execute(boarding_pass.select()).fetchall()
