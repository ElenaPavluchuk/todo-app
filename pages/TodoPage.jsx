import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoItem from "../src/components/TodoItem";
import axios from "axios";

function TodoPage() {
  // redux
  const tasks = useSelector((state) => state.tasks.value);
  const dispatch = useDispatch();

  // state
  const [newItem, setNewItem] = useState("");
  const [updatedItem, setUpdatedItem] = useState("");

  // on page load
  useEffect(() => {
    // get all items from database
    const getAllItems = async () => {
      const response = await axios.get("http://localhost:3001/items");
      console.log("Response from server", response);
      // save to redux
      dispatch({
        type: "tasks/setTasks",
        payload: response.data.map((item) => {
          return {
            id: item._id,
            item: item.item,
          };
        }),
      });
    };

    getAllItems();
  }, [dispatch]);

  // CRUD:
  const addItem = async () => {
    // save to database API call
    const response = await axios.post("http://localhost:3001/items", {
      item: newItem,
    });
    console.log("Save item response: ", response);

    dispatch({
      type: "tasks/addTask",
      payload: { id: response.data._id, item: response.data.item },
    });
    setNewItem("");
  };

  const deleteItem = async (id) => {
    // delete from database API call
    const response = await axios.delete(`http://localhost:3001/items/${id}`);
    console.log("response delete", response);

    dispatch({
      type: "tasks/deleteTask",
      payload: { id },
    });
  };

  const completeItem = async (id, isTaskComplete) => {
    // update task in database to be completed
    const response = await axios.put(`http://localhost:3001/items/${id}`, {
      isTaskComplete: !isTaskComplete,
    });
    console.log("response complete task: ", response);

    dispatch({
      type: "tasks/completeTask",
      payload: id,
    });
  };

  const updateItem = (id, currentItemValue) => {
    dispatch({
      type: "tasks/updateTask",
      payload: { id, item: currentItemValue },
    });
  };

  const saveUpdatedItem = async (id) => {
    // save updated item in database API call
    const response = await axios.put(`http://localhost:3001/items/${id}`, {
      item: updatedItem,
    });
    console.log("Response from server update: ", response);

    dispatch({
      type: "tasks/saveUpdatedTask",
      payload: { id, item: updatedItem },
    });
  };

  const cancelUpdatedItem = async (id) => {
    dispatch({
      type: "tasks/cancelUpdatedTask",
      payload: { id },
    });
  };

  return (
    <div className="todo-main-container">
      <h3 className="title-h2">Todo App</h3>

      <div className="add-items-container">
        <input
          className="add-items-input"
          type="text"
          placeholder="Todo item"
          onChange={(e) => setNewItem(e.target.value)}
          value={newItem}
        />
        <button className="add-items-btn" onClick={addItem}>
          ADD
        </button>
      </div>

      <div>
        <p className="mt-10 underline">Things to do today:</p>
        <ul>
          {tasks?.map((item) => {
            return (
              <TodoItem
                key={item.id}
                item={item}
                completeTask={() => completeItem(item.id, item?.isTaskComplete)}
                deleteTask={() => deleteItem(item.id)}
                editTask={() => {
                  updateItem(item.id, item.item);
                  setUpdatedItem(item.item);
                }}
                updatedTask={updatedItem || ""}
                handleChangeEditTask={(e) => setUpdatedItem(e.target.value)}
                saveUpdatedTask={() => saveUpdatedItem(item.id)}
                cancelUpdatedTask={() => cancelUpdatedItem(item.id)}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default TodoPage;
