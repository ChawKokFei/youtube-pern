const express = require("express");
//app will run express library
const app = express();
const cors = require("cors");
const pool = require("./db"); //importing pool from db.js

//middleware
app.use(cors());
//this lets us access the body of the request
//and get the json data from the request
app.use(express.json()); //req.body

//ROUTES//

//create a todo
//.post is use to post data to /todos
//async provides us a function "await" which wait for the
//function to complete before it continues
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body; //destructuring the req.body
    // the $1 is a placeholder for the description (dynamic data)
    // returning * is used whenever we want are updating, inserting or deleting
    const newTodo = await pool.query(
      "INSERT INTO todos (description) VALUES ($1) RETURNING *",
      [description]
    ); //inserting the description into the todos table

    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todos");
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todos WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todos SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json("Todo updated successfully");
  } catch (error) {
    console.error(error.message);
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM todos WHERE todo_id = $1",
      [id]
    );
    res.json("Todo deleted successfully");
  } catch (error) {
    console.error(error.message);
  }
});

//app listen to port 5000 and
//return the function, console.log the message
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
