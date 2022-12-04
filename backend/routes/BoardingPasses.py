from fastapi import APIRouter
from config.db import conn
from models.models import boarding_pass
from schemas.index import BoardingPass
from datetime import date


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
@boardingpasses.post("/createBoardingPass")
async def createBoardingPass(id : int , passport_number: str, flight_number: str, departure_gate: str, airplane_id : int, seat_letter: str, seat_number : int):
    conn.execute(boarding_pass.insert().values(
        id = boardingpasses.id,
        passport_number = boardingpasses.passport_number,
        flight_number = boardingpasses.flight_number,
        departure_gate = boardingpasses.departure_gate,
        airplane_id = boardingpasses.airplane_id,
        seat_letter = boardingpasses.seat_letter,
        seat_number = boardingpasses.seat_number
    ))
    return conn.execute(boarding_pass.select()).fetchall()

## update boardingpass
@boardingpasses.put("/updateBoardingPass{id}")
async def updateBoardingPass(id : int , passport_number: str, flight_number: str, departure_gate: str, airplane_id : int, seat_letter: str, seat_number : int):
    conn.execute(boarding_pass.update().values(
        passport_number = boardingpasses.passport_number,
        flight_number = boardingpasses.flight_number,
        departure_gate = boardingpasses.departure_gate,
        airplane_id = boardingpasses.airplane_id,
        seat_letter = boardingpasses.seat_letter,
        seat_number = boardingpasses.seat_number
    ).where(boarding_pass.c.id == id))
    return conn.execute(boarding_pass.select()).fetchall()

## delete boardingpass
@boardingpasses.delete("/deleteBoardingPass{id}")
async def deleteBoardingPass(id: int):
    conn.execute(boarding_pass.delete().where(boarding_pass.c.id == id))
    return conn.execute(boarding_pass.select()).fetchall()
