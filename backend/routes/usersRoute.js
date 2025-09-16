const express = require("express");
const router = express.Router();
const knex = require("../db/db");

// register new user
router.post("/", async (req, res) => {
  const { email, hashedPassword } = req.body;

  if (!email || !hashedPassword) {
    return res.status(401).json({ message: "email and password are required" });
  }

  try {
    const existingUser = await knex("users").where({ email: email }).first();

    if (existingUser) {
      return res
        .status(401)
        .json({ message: "user with this email already exists" });
    }

    await knex
      .insert({ email: email, hashed_password: hashedPassword })
      .into("users");

    return res.status(201).json({
      message: "user registered successfully",
    });
  } catch (err) {
    console.log(err);
  }
});

// login user
router.post("/login", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await knex("users").where({ email }).first();

    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }

    // console.log("logged in user: ", user);

    res.status(200).json({
      hashedPassword: user.hashed_password,
      userId: user.id,
    });
  } catch (err) {
    console.error("login error: ", err);
    res.status(501).json({ error: err });
  }
});

module.exports = router;
