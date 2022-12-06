from sqlalchemy import Table, Column, Integer, String, ForeignKey
from sqlalchemy.sql.sqltypes import Integer, String, Date, DateTime
from config.db import meta


customer = Table(
    'customer', meta,
    Column('passport_number', String(50), primary_key=True),
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
    Column('city', String(50)), 
    Column('name', String(50)),
    Column('country', String(50))
)



boarding_pass = Table(
    'boarding_pass', meta,
    Column('id', Integer, primary_key=True),
    Column('passport_number', String(50), ForeignKey('customer.passport_number')),
    Column('flight_number', String(50)),
    Column('departure_gate', String(50)),
    Column('airplane_id', Integer),
    Column('seat_letter', String(1)),
    Column('seat_number', Integer)
)


flight_booked = Table(
    'flight_booked', meta,
    Column('boarding_id', Integer, primary_key=True),
    Column('passport_number', String(50), ForeignKey('customer.passport_number')),
    Column('flight_number', String(50)),
    
)


seat = Table(
    'seat', meta,
    Column('airplane_id', Integer, primary_key=True),
    Column('letter', String(50), primary_key=True),
    Column('number', Integer, primary_key=True),

)


flight = Table(
    'flight', meta,
    Column('flight_number', String(50), primary_key=True),
    Column('arrival_airport', String(50)),
    Column('departure_airport', String(50)),
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
    Column('rowss', Integer),
    Column('seats_per_row', Integer),
    Column('carrier_id', Integer)
)