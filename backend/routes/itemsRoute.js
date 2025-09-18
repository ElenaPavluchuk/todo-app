const express = require("express");
const router = express.Router();
const knex = require("../db/db");

// create new item in database
router.post("/", async (req, res) => {
  const { item, userId } = req.body;

  try {
    const result = await knex("todos")
      .insert({
        item,
        user_id: userId,
      })
      .returning("*");

    // console.log("result POST items: ", result);
    res.status(201).json(result[0]);
  } catch (err) {
    console.error("error creating a todo item: ", err);
    res.status(500).json({ error: "error adding new item" });
  }
});

// get all items from database
router.get("/", async (req, res) => {
  const userId = req.query.userId;

  try {
    const result = await knex("todos").where({ user_id: userId });

    // console.log("GET items result", result);
    res.json(result);
  } catch (err) {
    console.error("error getting user items", err);
    res.status(500).json({ error: "error getting user items" });
  }
});

// delete item from database
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await knex("todos").where({ id }).del().returning("*");

    // console.log("deleting todo items: ", result);
    res.json(result);
  } catch (err) {
    console.error("error deleting a todo item", err);
    res.status(500).json({ error: err });
  }
});

// update item in the database
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { item, isTaskComplete } = req.body;
  // console.log("UPDATED ITEM: ", item, isTaskComplete);

  try {
    const result = await knex("todos")
      .where({ id })
      .update({ item, is_task_complete: isTaskComplete })
      .returning("*");

    // console.log("updating todo item: ", result);
    res.json(result);
  } catch (err) {
    console.error("error updating item: ", err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;
