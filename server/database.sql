/*This file is just to put the SQL codes*/
CREATE DATABASE perntodo;

CREATE TABLE todos(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);