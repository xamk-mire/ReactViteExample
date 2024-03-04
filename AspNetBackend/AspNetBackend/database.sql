CREATE DATABASE ContactsDB;

CREATE TABLE contacts(
    id INT PRIMARY KEY IDENTITY not null,
    firstName VARCHAR(255) not null,
    lastName VARCHAR(255) not null,
    twitter VARCHAR(255),
    avatar VARCHAR(255),
    notes VARCHAR(255),
    favorite BIT DEFAULT false,
    createdAt DATETIME DEFAULT GETDATE()
);