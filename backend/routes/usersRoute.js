const express = require("express");
const router = express.Router();
const pool = require("../db/db");

// register new user
router.post("/", async (req, res) => {
  const { email, hashedPassword } = req.body;

  if (!email || !hashedPassword) {
    return res.status(401).json({ message: "email and password are required" });
  }

  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    // console.log("existing user: ", existingUser);

    if (existingUser.rows.length > 0) {
      return res
        .status(401)
        .json({ message: "user with this email already exists" });
    }

    // if no existing user, need to create one
    await pool.query(
      "INSERT INTO users (email, hashed_password) VALUES ($1, $2) RETURNING *", // RETURNING *
      [email, hashedPassword]
    );

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
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json({ message: "user not found" });
    }

    // console.log("logged in user: ", user);
    // res.json("LOGIN USER ROUTE");
    res.status(200).json({
      hashedPassword: user.rows[0].hashed_password,
      userId: user.rows[0].id,
    });
  } catch (err) {
    console.error("login error: ", err);
    res.status(501).json({ error: err });
  }
});

module.exports = router;
