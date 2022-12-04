DROP DATABASE IF EXISTS test;
CREATE DATABASE test;



CREATE TABLE CUSTOMER
(
passport_number		VARCHAR(6)		NOT NULL,
phone				VARCHAR(14)	NOT NULL,
email				VARCHAR(255)	NOT NULL,
fname				VARCHAR(15)	NOT NULL,
lname				VARCHAR(15)	NOT NULL,
credit_card_number		INT			NOT NULL,
credit_card_csc		INT			NOT NULL,
credit_card_expiry		DATE			NOT NULL,
credit_card_name		VARCHAR(31)	NOT NULL,
PRIMARY KEY (passport_number)
);

--insert random data into the customer table
    INSERT INTO CUSTOMER VALUES ("444", "5875788888", "POOP@GMAIL.COM", "JIM", "BOB", "123456789", "123", "2019-12-12", "JIM BOB");








