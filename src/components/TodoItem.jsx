import PropTypes from "prop-types";

TodoItem.propTypes = {
  item: PropTypes.object.isRequired,
  completeTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  updatedTask: PropTypes.string.isRequired,
  handleChangeEditTask: PropTypes.func.isRequired,
  saveUpdatedTask: PropTypes.func.isRequired,
  cancelUpdatedTask: PropTypes.func.isRequired,
};

export default function TodoItem({
  item,
  completeTask,
  deleteTask,
  editTask,
  updatedTask,
  handleChangeEditTask,
  saveUpdatedTask,
  cancelUpdatedTask,
}) {
  return (
    <li key={item.id} className="list-disc ml-5">
      <div className="item-btn-container">
        <p className={item.isTaskComplete ? "line-through" : ""}>{item.item}</p>

        <div className="crat-btn-container">
          <button
            onClick={() => completeTask(item.id)}
            className="complete-btn"
          >
            {item.isTaskComplete ? "Undo" : "Complete"}
          </button>

          <button
            onClick={() => editTask(item.id, item.item)}
            className="edit-btn"
          >
            Edit
          </button>

          <button onClick={() => deleteTask(item.id)} className="delete-btn">
            Delete
          </button>
        </div>
      </div>

      {item.isEdit && (
        <div className="update-item-container">
          <input
            value={updatedTask}
            onChange={handleChangeEditTask}
            className="update-item-input"
          />
          <button
            onClick={() => saveUpdatedTask(item.id)}
            className="update-item-save-btn"
          >
            Save
          </button>
          <button
            onClick={() => cancelUpdatedTask(item.id)}
            className="update-item-cancel-btn"
          >
            Cancel
          </button>
        </div>
      )}
    </li>
  );
}
