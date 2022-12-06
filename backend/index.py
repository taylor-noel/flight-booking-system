from fastapi import FastAPI
from routes.index import customers
from routes.index import admins
from routes.index import flights
from routes.index import airplanecarriers
from routes.index import airplanes
from routes.index import flightsbooked
from routes.index import boardingpasses
from routes.index import airports
from routes.index import seats
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(admins)
app.include_router(customers)
app.include_router(flights)
app.include_router(airplanecarriers)
app.include_router(airplanes)
app.include_router(flightsbooked)
app.include_router(boardingpasses)
app.include_router(airports)
app.include_router(seats)

@app.get("/")
async def root():
    return {"message": "Hello Bigger Applications!"}

