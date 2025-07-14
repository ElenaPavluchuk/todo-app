import express from "express";
import cors from "cors";
import mongoose, { Schema } from "mongoose";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(cors());

// Database connection
mongoose
  .connect(
    `mongodb+srv://elenapvlch:${process.env.MONGO_DB_PASSWORD}@todocluster.fvqldyl.mongodb.net/todo-db?retryWrites=true&w=majority&appName=TodoCluster`
  )
  .then(() => console.log("Connected!"));

// Schema
const todoSchema = new Schema({
  item: String,
  isTaskComplete: Boolean,
});

// Model
const Todo = mongoose.model("Todo", todoSchema);

// API routes - CRUD operations

// create new item in database
app.post("/items", (req, res) => {
  const newItem = new Todo(req.body);
  newItem.save();

  res.json(newItem);
});

// get all items from database
app.get("/items", async (req, res) => {
  await Todo.find()
    .then((items) => {
      res.json(items);
    })
    .catch((err) => console.log(err));
});

// delete item from database
app.delete("/items/:id", async (req, res) => {
  const id = req.params.id;

  await Todo.findByIdAndDelete(id)
    .then((deletedItem) => {
      res.json(deletedItem);
    })
    .catch((err) => console.log(err));
});

// update item in the database
app.put("/items/:id", async (req, res) => {
  const id = req.params.id;
  await Todo.findByIdAndUpdate(id, req.body, {
    new: true,
  })
    .then((item) => {
      res.json(item);
    })
    .catch((err) => console.log(err));
});

const users = [
  {
    id: 1,
    name: "Marina",
    email: "marina@test.com",
    hashedPassword:
      "$2a$10$uOI.RylLCp7/mx73fbh/4uMYM/gfj0V1e.mJXjDrp3WCdcGaKhOKm",
  },
];

// login user
app.post("/login", async (req, res) => {
  const { email, hashedPassword } = req.body;
  // console.log("user is trying to login: ", email, password);

  const user = users.find((user) => user.email === email);
  // console.log("user found: ", user);

  if (!user) {
    return res.status(401).json({ message: "user not found" });
  }

  // if (user.hashedPassword !== hashedPassword) {
  //   return res.status(401).json({ message: "wrong password" });
  // }

  res.status(200).json({ hashedPassword: user.hashedPassword });
});

// Server running
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
