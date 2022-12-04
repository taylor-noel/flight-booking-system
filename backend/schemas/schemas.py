from pydantic import BaseModel 
from datetime import date

 
class Customer(BaseModel):
    passport_number: str
    phone: str
    email: str
    fname: str
    lname: str
    credit_card_number: int
    credit_card_csc: int
    credit_card_expiry: date
    credit_card_name: str


class Airport(BaseModel):
    id: int
    city: str
    name: str
    country: str



class BoardingPass(BaseModel):
    id: int
    passport_number: str
    flight_number: str
    departure_gate: str
    airplane_id: int
    seat_letter: str
    seat_number: int


class FlightBooked(BaseModel):
    boarding_id: int
    passport_number: str
    flight_number: str
    


class Seat(BaseModel):
    airplane_id: int
    letter: str
    number: int



class Flight(BaseModel):
    flight_number: str
    arrival_airport: int
    departure_airport: int
    airplane_id: int
    departure_time: date
    arrival_time: date



class Admin(BaseModel):
    email: str
    password: str



class AirplaneCarrier(BaseModel):
    id: int
    email: str
    address: str
    phone: str
    name: str


class Airplane(BaseModel):
    id: int
    model: str
    rows: int
    seats_per_row: int
    carrier_id: int