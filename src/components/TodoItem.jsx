import PropTypes from "prop-types";

TodoItem.propTypes = {
  item: PropTypes.object.isRequired,
  completeTask: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  updatedItem: PropTypes.string.isRequired,
  onChangeEditItem: PropTypes.func.isRequired,
  saveUpdatedItem: PropTypes.func.isRequired,
  cancelEditItem: PropTypes.func.isRequired,
};

export default function TodoItem({
  item,
  completeTask,
  deleteItem,
  editItem,
  updatedItem,
  onChangeEditItem,
  saveUpdatedItem,
  cancelEditItem,
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
            onClick={() => editItem(item.id, item.item)}
            className="edit-btn"
          >
            Edit
          </button>

          <button onClick={() => deleteItem(item.id)} className="delete-btn">
            Delete
          </button>
        </div>
      </div>

      {item.isEdit && (
        <div className="update-item-container">
          <input
            value={updatedItem}
            onChange={onChangeEditItem}
            className="update-item-input"
          />
          <button
            onClick={() => saveUpdatedItem(item.id)}
            className="update-item-save-btn"
          >
            Save
          </button>
          <button
            onClick={() => cancelEditItem(item.id)}
            className="update-item-cancel-btn"
          >
            Cancel
          </button>
        </div>
      )}
    </li>
  );
}
