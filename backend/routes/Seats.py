from fastapi import APIRouter
from config.db import conn
from models.models import seat
from schemas.index import Seat
from datetime import date, datetime
from sqlalchemy.sql import text

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
@seats.put("/createSeat")
async def createSeat(airplane_id: int, letter: str, number: int):
    s = text("insert into seat (airplane_id, letter, number) values (:airplane_id, :letter, :number)")
    return conn.execute(s, airplane_id = airplane_id, letter = letter, number = number)
## update seat
@seats.post("/updateSeat{airplane_id}")
async def updateSeat(airplane_id: int, letter: str, number: int):
    s = text("update seat set letter = :letter, number = :number where airplane_id = :airplane_id")
    return conn.execute(s, airplane_id = airplane_id, letter = letter, number = number)
## delete seat
@seats.delete("/deleteSeat{airplane_id}")
async def deleteSeat(airplane_id: int):
    conn.execute(seat.delete().where(seat.c.airplane_id == airplane_id))
    return conn.execute(seat.select()).fetchall()
