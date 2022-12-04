from sqlalchemy import Table,Column,Integer,String,ForeignKey,Date,Boolean
import sqlalchemy.ext.declarative as _declarative
import sqlalchemy.orm as _orm
import sqlalchemy as _sql

DATABASE_URL = "sqlite:///./airlineapp.db"

engine = _sql.create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

SessionLocal = _orm.sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = _declarative.declarative_base()


