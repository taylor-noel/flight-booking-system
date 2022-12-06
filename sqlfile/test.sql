    DROP DATABASE IF EXISTS test;
    CREATE DATABASE test;
    USE test;


    DROP TABLE IF EXISTS CUSTOMER;
    CREATE TABLE CUSTOMER(
        passport_number varchar(50) not null,
        phone varchar(50) not null,
        name varchar(50) not null,
        fname varchar(50) not null,
        lname varchar(50) not null,
        credit_card_number varchar(50) not null,
        credit_card_csc varchar(50) not null,
        credit_card_expiry varchar(50) not null,
        credit_card_name varchar(50) not null,
        primary key(passport_number)
    );

    
    DROP TABLE IF EXISTS airport;
    CREATE TABLE airport(
        id int not null,
        city varchar(50) not null,
        name varchar(50) not null,
        country varchar(50) not null,
        primary key(id)
    );

    
    INSERT INTO airport VALUES(1, 'Toronto', 'Pearson International Airport', 'Canada');
    INSERT INTO airport VALUES(2, 'Toronto', 'Billy Bishop Toronto City Airport', 'Canada');
    INSERT INTO airport VALUES(3, 'Toronto', 'Downsview Airport', 'Canada');
    INSERT INTO airport VALUES(4, 'Toronto', 'Buttonville Municipal Airport', 'Canada');
    INSERT INTO airport VALUES(5, 'Toronto', 'Brampton Airport', 'Canada');
    INSERT INTO airport VALUES(6, 'Calgary', 'Calgary International Airport', 'Canada');
    INSERT INTO airport VALUES(7, 'Vancover', 'Vancouver International Airport', 'Canada');
    INSERT INTO airport VALUES(8, 'Montreal', 'Montréal–Pierre Elliott Trudeau International Airport', 'Canada');
    INSERT INTO airport VALUES(9, 'Bejing', 'Beijing Capital International Airport', 'China');
    INSERT INTO airport VALUES(10, 'Shanghai', 'Shanghai Pudong International Airport', 'China');
    INSERT INTO airport VALUES(11, 'Soeul', 'Incheon International Airport', 'South Korea');
    INSERT INTO airport VALUES(12, 'Tokyo', 'Tokyo Haneda Airport', 'Japan');
    INSERT INTO airport VALUES(13, 'Mexico City', 'Benito Juárez International Airport', 'Mexico');
    INSERT INTO airport VALUES(14, 'New York', 'John F. Kennedy International Airport', 'USA');
    INSERT INTO airport VALUES(15, 'Los Angeles', 'Los Angeles International Airport', 'USA');
    INSERT INTO airport VALUES(16, 'Chicago', 'Chicago O\Hare International Airport', 'USA');
    INSERT INTO airport VALUES(17, 'San Francisco', 'San Francisco International Airport', 'USA');
    INSERT INTO airport VALUES(18, 'London', 'London Heathrow Airport', 'UK');
    INSERT INTO airport VALUES(19, 'Paris', 'Charles de Gaulle Airport', 'France');
    INSERT INTO airport VALUES(20, 'Rome', 'Leonardo da Vinci–Fiumicino Airport', 'Italy');
    INSERT INTO airport VALUES(21, 'Moscow', 'Sheremetyevo International Airport', 'Russia');
    INSERT INTO airport VALUES(22, 'Dubai', 'Dubai International Airport', 'UAE');
    INSERT INTO airport VALUES(23, 'Hong Kong', 'Hong Kong International Airport', 'Hong Kong');
    INSERT INTO airport VALUES(24, 'Singapore', 'Singapore Changi Airport', 'Singapore');
    INSERT INTO airport VALUES(25, 'Sydney', 'Sydney Airport', 'Australia');
    INSERT INTO airport VALUES(26, 'Melbourne', 'Melbourne Airport', 'Australia');
    INSERT INTO airport VALUES(27, 'Perth', 'Perth Airport', 'Australia');
    INSERT INTO airport VALUES(28, 'Brisbane', 'Brisbane Airport', 'Australia');
    INSERT INTO airport VALUES(29, 'Adelaide', 'Adelaide Airport', 'Australia');
    INSERT INTO airport VALUES(30, 'Auckland', 'Auckland International Airport', 'New Zealand');
    INSERT INTO airport VALUES(31, 'Wellington', 'Wellington International Airport', 'New Zealand');
    INSERT INTO airport VALUES(32, 'South Africa', 'Cape Town International Airport', 'South Africa');
    INSERT INTO airport VALUES(33, 'South Africa', 'Johannesburg International Airport', 'South Africa');
    INSERT INTO airport VALUES(34, 'South Africa', 'Durban International Airport', 'South Africa');
    INSERT INTO airport VALUES(35, 'Algeirs', 'Houari Boumediene Airport', 'Algeria');
    INSERT INTO airport VALUES(36, 'Egypt', 'Cairo International Airport', 'Egypt');
    INSERT INTO airport VALUES(37, 'Egypt', 'Alexandria International Airport', 'Egypt');


    DROP TABLE IF EXISTS airplane;
    CREATE TABLE airplane(
        id int not null,
        model varchar(50) not null,
        rowss int not null,
        seats_per_row int not null,
        primary key(id)
    );

  
    INSERT INTO airplane VALUES(1, 'Boeing 737', 30, 6);
    INSERT INTO airplane VALUES(2, 'Boeing 747', 40, 8);
    INSERT INTO airplane VALUES(3, 'Boeing 777', 50, 10);
    INSERT INTO airplane VALUES(4, 'Boeing 787', 60, 12);
    INSERT INTO airplane VALUES(5, 'Airbus A320', 30, 6);
    INSERT INTO airplane VALUES(6, 'Airbus A330', 40, 8);
    INSERT INTO airplane VALUES(7, 'Airbus A350', 50, 10);


    DROP TABLE IF EXISTS boarding_pass;
    CREATE TABLE boarding_pass(
        id int not null,
        passport_number varchar(50) not null,
        flight_number varchar(50) not null,
        departure_gate varchar(50) not null,
        airplane_id varchar(50) not null,
        seat_letter varchar(50) not null,
        seat_number varchar(50) not null,
        primary key(id),
        foreign key(passport_number) references customer(passport_number)
    );

  
    DROP TABLE IF EXISTS flight_booked;
    CREATE TABLE flight_booked(
        boarding_id int not null,
        passport_number varchar(50) not null,
        flight_number varchar(50) not null,
        primary key(boarding_id),
        foreign key(passport_number) references customer(passport_number)
    );

   
    DROP TABLE IF EXISTS seat;
    CREATE TABLE seat(
        airplane_id int not null,
        letter varchar(50) not null,
        number varchar(50) not null,
        primary key(airplane_id, letter, number)
    );


    DROP TABLE IF EXISTS flight;
    CREATE TABLE flight(
        flight_number varchar(50) not null,
        arrival_airport varchar(50) not null,
        departure_airport varchar(50) not null,
        airplane_id int not null,
        departure_time varchar(50) not null,
        arrival_time varchar(50) not null,
        primary key(flight_number),
        foreign key(airplane_id) references airplane(id)
    );


    INSERT INTO flight VALUES("F001", "Tokyo", "Mexico City", 1, "2020-01-01", "2020-01-02");

  
    DROP TABLE IF EXISTS admin;
    CREATE TABLE admin(
        email varchar(50) not null,
        password varchar(50) not null,
        primary key(email)
    );


    INSERT INTO admin VALUES("admin@admin.com", "admin");



    
    DROP TABLE IF EXISTS AIRPLANE_CARRIER;
    CREATE TABLE AIRPLANE_CARRIER(
        id int not null,
        email varchar(50) not null,
        address varchar(50) not null,
        phone varchar(50) not null,
        name varchar(50) not null,
        primary key(id)
    );



