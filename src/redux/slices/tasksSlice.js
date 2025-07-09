import { createSlice } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    value: [],
  },
  reducers: {
    setTasks: (state, action) => {
      console.log("payload", action);
      state.value = action.payload;
    },

    addTask: (state, action) => {
      state.value = [...state.value, action.payload];
    },

    deleteTask: (state, action) => {
      state.value = state.value.filter((task) => task.id !== action.payload.id);
    },

    completeTask: (state, action) => {
      const completedTask = state.value.filter(
        (task) => task.id === action.payload
      )[0];
      completedTask.isTaskComplete = !completedTask.isTaskComplete;
    },

    updateTask: (state, action) => {
      const editedTask = state.value.filter(
        (task) => task.id === action.payload.id
      )[0];
      editedTask.isEdit = true;
      editedTask.item = action.payload.item;
    },

    saveUpdatedTask: (state, action) => {
      const updatedTask = state.value.filter(
        (task) => task.id === action.payload.id
      )[0];
      updatedTask.item = action.payload.item;
      updatedTask.isEdit = false;
    },

    cancelUpdatedTask: (state, action) => {
      const updatedTask = state.value.filter(
        (task) => task.id === action.payload.id
      )[0];
      updatedTask.isEdit = false;
    },
  },
});

export const {
  addTask,
  deleteTask,
  completeTask,
  updateTask,
  saveUpdatedTask,
  cancelUpdatedTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
