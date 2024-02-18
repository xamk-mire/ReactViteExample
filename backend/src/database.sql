CREATE DATABASE pernContact;

CREATE TABLE contacts(
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255);
    lastName VARCHAR(255);
    twitter VARCHAR(255);
    avatar VARCHAR(255);
    notes VARCHAR(255);
    favorite BOOLEAN;
    createdAt TIMESTAMP
);