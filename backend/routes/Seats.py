from fastapi import APIRouter
from config.db import conn
from models.models import seat
from schemas.index import Seat
from datetime import date, datetime

seats = APIRouter()

## get all seat
@seats.get("/getSeats")
async def getSeats():
    return conn.execute(seat.select()).fetchall()


## select for one seat by airplane_id
@seats.get("/selectSeat{airplane_id}")
async def selectSeat(airplane_id: int):
    return conn.execute(seat.select().where(seat.c.airplane_id == airplane_id)).fetchall()


## create new seat
@seats.post("/createSeat")
async def createSeat(airplane_id: int, letter: str, number: int):
    conn.execute(seat.insert().values(
        airplane_id = seats.airplane_id,
        letter = seats.letter,
        number = seats.number
    ))
    return conn.execute(seat.select()).fetchall()

## update seat
@seats.put("/updateSeat{airplane_id}")
async def updateSeat(airplane_id: int, letter: str, number: int):
    conn.execute(seat.update().values(
        letter = seats.letter,
        number = seats.number
    ).where(seat.c.airplane_id == airplane_id))
    return conn.execute(seat.select()).fetchall()

## delete seat
@seats.delete("/deleteSeat{airplane_id}")
async def deleteSeat(airplane_id: int):
    conn.execute(seat.delete().where(seat.c.airplane_id == airplane_id))
    return conn.execute(seat.select()).fetchall()
