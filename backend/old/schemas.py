import datetime as _dt
import pydantic as _pydantic


##create a class for customer
class Customer(_pydantic.BaseModel):
    passport_number: str
    phone: str
    email: str
    fname: str
    lname: str
    credit_card_number: int
    credit_card_csc: int
    credit_card_expiry: _dt.date
    credit_card_name: str


class CustomerCreate(Customer):
    pass

class Airport(_pydantic.BaseModel):
    id: int
    city: str
    name: str
    country: str

class AirportCreate(Airport):
    pass

class BoardingPass(_pydantic.BaseModel):
    id: int
    passport_number: str
    flight_number: str
    departure_gate: str
    airplane_id: int
    seat_letter: str
    seat_number: int

class BoardingPassCreate(BoardingPass):
    pass

class FlightBooked(_pydantic.BaseModel):
    boarding_id: int
    passport_number: str
    flight_number: str

class FlightBookedCreate(FlightBooked):
    pass

class Seat(_pydantic.BaseModel):
    airplane_id: int
    letter: str
    number: int

class SeatCreate(Seat):
    pass


class Flight(_pydantic.BaseModel):
    flight_number: str
    arrival_airport: int
    departure_airport: int
    airplane_id: int
    departure_time: _dt.datetime
    arrival_time: _dt.datetime

class FlightCreate(Flight):
    pass


class Admin(_pydantic.BaseModel):
    email: str
    password: str

class AdminCreate(Admin):
    pass

class AirplaneCarrier(_pydantic.BaseModel):
    id: int
    email: str
    address: str
    phone: str
    name: str

class AirplaneCarrierCreate(AirplaneCarrier):
    pass

class Airplane(_pydantic.BaseModel):
    id: int
    model: str
    rows = int
    seats_per_row = int
    carrier_id = int

class AirplaneCreate(Airplane):
    pass


##have createfunctions for each class

