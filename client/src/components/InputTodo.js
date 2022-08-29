import { Fragment, useState } from "react";

//mt-5 is margin top
const InputTodo = () => {
  //description is our state, setDescription is to update our state
  //useState to show default value
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
        const body = { description };
        //by default fetch makes a get request
        //so we need to mention what method is used
        //what is going to be sent is JSON data
        //lastly what is going to be sent? the body
        const response = await fetch("http://localhost:5000/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        
        // once we get the response, we need to refresh the page
        window.location = "/";
    } catch (error) {
        console.error(error.message);
    }
  };

  //on submit is going to be triggered when submitted
  //the e.target.value is the value of the input
  return (
    <Fragment>
      <h1 className="text-center mt-5">Pern Todo List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  );
};

export default InputTodo;
