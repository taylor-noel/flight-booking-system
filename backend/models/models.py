from sqlalchemy import Table, Column, Integer, String, ForeignKey
from sqlalchemy.sql.sqltypes import Integer, String, Date, DateTime
from config.db import meta


customer = Table(
    'customer', meta,
    Column('passport_number', String(6), primary_key=True),
    Column('phone', String(14)),
    Column('email', String(255)),
    Column('fname', String(15)),
    Column('lname', String(15)),
    Column('credit_card_number', Integer),
    Column('credit_card_csc', Integer),
    Column('credit_card_expiry', Date),
    Column('credit_card_name', String(31))
)

airport = Table(
    'airport', meta,
    Column('id', Integer, primary_key=True),
    Column('city', String(25)), 
    Column('name', String(25)),
    Column('country', String(25))
)



boarding_pass = Table(
    'boarding_pass', meta,
    Column('id', Integer, primary_key=True),
    Column('passport_number', String(6), ForeignKey('customer.passport_number')),
    Column('flight_number', String(6), ForeignKey('flight.flight_number')),
    Column('departure_gate', String(3)),
    Column('airplane_id', Integer, ForeignKey('airplane.id')),
    Column('seat_letter', String(1), ForeignKey('seat.letter')),
    Column('seat_number', Integer, ForeignKey('seat.number'))
)


flight_booked = Table(
    'flight_booked', meta,
    Column('boarding_id', Integer, ForeignKey('boarding_pass.id')),
    Column('passport_number', String(6), ForeignKey('customer.passport_number')),
    Column('flight_number', String(6), ForeignKey('flight.flight_number')),
    Column('primary_key', Integer, primary_key=True)
)


seat = Table(
    'seat', meta,
    Column('airplane_id', Integer, ForeignKey('airplane.id')),
    Column('letter', String(1)),
    Column('number', Integer),
    Column('primary_key', Integer, primary_key=True)
)


flight = Table(
    'flight', meta,
    Column('flight_number', String(6), primary_key=True),
    Column('arrival_airport', Integer, ForeignKey('airport.id')),
    Column('departure_airport', Integer, ForeignKey('airport.id')),
    Column('airplane_id', Integer, ForeignKey('airplane.id')),
    Column('departure_time', DateTime),
    Column('arrival_time', DateTime)
)



admin = Table(
    'admin', meta,
    Column('email', String(255), primary_key=True),
    Column('password', String(64))
)


airplane_carrier = Table(
    'airplane_carrier', meta,
    Column('id', Integer, primary_key=True),
    Column('email', String(255)),
    Column('address', String(255)),
    Column('phone', String(14)),
    Column('name', String(25))
)


airplane = Table(
    'airplane', meta,
    Column('id', Integer, primary_key=True),
    Column('model', String(25)),
    Column('rows', Integer),
    Column('seats_per_row', Integer),
    Column('carrier_id', Integer, ForeignKey('airplane_carrier.id'))
)