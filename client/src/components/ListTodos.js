import React, { Fragment, useEffect, useState } from "react";

import EditTodo from "./EditTodo";

//useEffect is going to make a fetch request to
//the restful api every time this component is rendered
const ListTodos = () => {
  //default value of empty array
  const [todos, setTodos] = useState([]);

  //delete todo function
  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });

      //filter set a condition where it will only return
      //the elements that fulfill the condition
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTodos = async () => {
    try {
      //by default fetch makes a get request
      const response = await fetch("http://localhost:5000/todos");
      //the data has to be parsed to json
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  //useEffect constantly makes request
  //add the empty array so that it just make 1 request
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            //assign the key to each row
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo}/>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
