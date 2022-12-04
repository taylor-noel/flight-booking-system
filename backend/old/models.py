import datetime as _dt

import sqlalchemy as _sql
import sqlalchemy.orm as _orm
import passlib.hash as _hash

import old.database as _database



class Customer(_database.Base):
    __tablename__ = "customer"
    passport_number = _sql.Column(_sql.String, primary_key=True, index=True)
    phone = _sql.Column(_sql.String)
    email = _sql.Column(_sql.String)
    fname = _sql.Column(_sql.String)
    lname = _sql.Column(_sql.String)
    credit_card_number = _sql.Column(_sql.Integer)
    credit_card_csc = _sql.Column(_sql.Integer)
    credit_card_expiry = _sql.Column(_sql.Date)
    credit_card_name = _sql.Column(_sql.String)


class Airport(_database.Base):
    __tablename__ = "airport"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    city = _sql.Column(_sql.String)
    name = _sql.Column(_sql.String)
    country = _sql.Column(_sql.String)



class BoardingPass(_database.Base):
    __tablename__ = "boarding_pass"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    passport_number = _sql.Column(_sql.String, _sql.ForeignKey('customer.passport_number'))
    flight_number = _sql.Column(_sql.String, _sql.ForeignKey('flight.flight_number'))
    departure_gate = _sql.Column(_sql.String)
    airplane_id = _sql.Column(_sql.Integer, _sql.ForeignKey('airplane.id'))
    seat_letter = _sql.Column(_sql.String, _sql.ForeignKey('seat.letter'))
    seat_number = _sql.Column(_sql.Integer, _sql.ForeignKey('seat.number'))



class FlightBooked(_database.Base):
    __tablename__ = "flight_booked"
    boarding_id = _sql.Column(_sql.Integer, _sql.ForeignKey('boarding_pass.id'), primary_key=True)
    passport_number = _sql.Column(_sql.String, _sql.ForeignKey('customer.passport_number'), primary_key=True)
    flight_number = _sql.Column(_sql.String, _sql.ForeignKey('flight.flight_number'), primary_key=True)



class Seat(_database.Base):
    __tablename__ = "seat"
    airplane_id = _sql.Column(_sql.Integer, _sql.ForeignKey('airplane.id'), primary_key=True)
    letter = _sql.Column(_sql.String, primary_key=True)
    number = _sql.Column(_sql.Integer, primary_key=True)



class Flight(_database.Base):
    __tablename__ = "flight"
    flight_number = _sql.Column(_sql.String, primary_key=True, index=True)
    arrival_airport = _sql.Column(_sql.Integer, _sql.ForeignKey('airport.id'))
    departure_airport = _sql.Column(_sql.Integer, _sql.ForeignKey('airport.id'))
    airplane_id = _sql.Column(_sql.Integer, _sql.ForeignKey('airplane.id'))
    departure_time = _sql.Column(_sql.DateTime)
    arrival_time = _sql.Column(_sql.DateTime)



class Admin(_database.Base):
    __tablename__ = "admin"
    email = _sql.Column(_sql.String, primary_key=True, index=True)
    password = _sql.Column(_sql.String)



class AirplaneCarrier(_database.Base):
    __tablename__ = "airplane_carrier"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    email = _sql.Column(_sql.String)
    address = _sql.Column(_sql.String)
    phone = _sql.Column(_sql.String)
    name = _sql.Column(_sql.String)


class Airplane(_database.Base):
    __tablename__ = "airplane"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    model = _sql.Column(_sql.String)
    rows = _sql.Column(_sql.Integer)
    seats_per_row = _sql.Column(_sql.Integer)
    carrier_id = _sql.Column(_sql.Integer, _sql.ForeignKey('airplane_carrier.id'))