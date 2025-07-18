import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slices/tasksSlice";

export default configureStore({
  reducer: { tasks: tasksReducer },
});
