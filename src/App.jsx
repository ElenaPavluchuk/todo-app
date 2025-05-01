import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoItem from "./components/TodoItem";
import axios from "axios";

function App() {
  const tasks = useSelector((state) => state.tasks.value); // redux store
  const dispatch = useDispatch();

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

  const handleChange = (e) => {
    setNewItem(e.target.value);
  };

  // CRUD:
  const addItemToRedux = async () => {
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

  const deleteItemFromRedux = async (id) => {
    dispatch({
      type: "tasks/deleteTask",
      payload: { id },
    });

    // delete from database API call
    const response = await axios.delete(`http://localhost:3001/items/${id}`);
    console.log("response delete", response);
  };

  const completeTaskInRedux = async (id, isTaskComplete) => {
    dispatch({
      type: "tasks/completeTask",
      payload: id,
    });

    // update task in database to be completed
    const response = await axios.put(`http://localhost:3001/items/${id}`, {
      isTaskComplete: !isTaskComplete,
    });

    console.log("response complete task: ", response);
  };

  const updateTaskInRedux = (id, currentItemValue) => {
    dispatch({
      type: "tasks/updateTask",
      payload: { id, item: currentItemValue },
    });
  };

  const saveUpdatedItemInRedux = async (id) => {
    dispatch({
      type: "tasks/saveUpdatedItem",
      payload: { id, item: updatedItem },
    });

    // save updated item in database API call
    const response = await axios.put(`http://localhost:3001/items/${id}`, {
      item: updatedItem,
    });

    console.log("Response from server update: ", response);
  };
  return (
    <div className="todo-main-container">
      <h3 className="title-h2">Todo App</h3>

      <div className="add-items-container">
        <input
          className="add-items-input"
          type="text"
          placeholder="Todo item"
          onChange={handleChange}
          value={newItem}
        />
        <button className="add-items-btn" onClick={addItemToRedux}>
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
                completeTask={() =>
                  completeTaskInRedux(item.id, item?.isTaskComplete)
                }
                deleteItem={() => deleteItemFromRedux(item.id)}
                editItem={() => {
                  updateTaskInRedux(item.id, item.item);
                  setUpdatedItem(item.item);
                }}
                updatedItem={updatedItem || ""}
                onChangeEditItem={(e) => setUpdatedItem(e.target.value)}
                saveUpdatedItem={() => saveUpdatedItemInRedux(item.id)}
                cancelEditItem={() => saveUpdatedItemInRedux(item.id)}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
