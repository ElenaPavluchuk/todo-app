import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoItem from "./components/TodoItem";

function App() {
  const tasks = useSelector((state) => state.tasks.value);
  const dispatch = useDispatch();

  const [newItem, setNewItem] = useState("");
  const [updatedItem, setUpdatedItem] = useState("");

  const handleChange = (e) => {
    setNewItem(e.target.value);
  };

  // CRUD:
  const addItemToRedux = () => {
    dispatch({
      type: "tasks/addTask",
      payload: { id: tasks.length + 1, item: newItem },
    });
    setNewItem("");
  };

  const deleteItemFromRedux = (id) => {
    dispatch({
      type: "tasks/deleteTask",
      payload: { id },
    });
  };

  const completeTaskInRedux = (id) => {
    dispatch({
      type: "tasks/completeTask",
      payload: id,
    });
  };

  const updateTaskInRedux = (id, currentItemValue) => {
    dispatch({
      type: "tasks/updateTask",
      payload: { id, item: currentItemValue },
    });
  };

  const saveUpdatedItemInRedux = (id) => {
    dispatch({
      type: "tasks/saveUpdatedItem",
      payload: { id, item: updatedItem },
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
                completeTask={() => completeTaskInRedux(item.id)}
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
