const bodyParser = require("body-parser");
const cors = require("cors");

const Pool = require("pg").Pool;

const express = require("express");

const app = express();

const PORT = 8080;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "threads",
  password: "postgres",
  port: 5432,
});

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/getUser/:email", (req, res) => {
  const email = req.params.email;
  console.log(req.params)
  const query = `SELECT username FROM users WHERE email='${email}'`;
  pool.query(query, (error, result) => {
    if (error) {
      throw error;
    }

    res.status(200).send(result.rows);
  });
});

app.post("/createUser", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const query = `INSERT INTO users (username,email) VALUES ('${username}','${email}')`;
  pool.query(query, (error, result) => {
    if (error) {
      throw error;
    }

    res.status(200).send("User added");
  });
});

app.post("/createPost", (req, res) => {
  const username = req.body.username;
  const content = req.body.content;
  const query = `INSERT INTO post (username,content) VALUES ('${username}','${content}')`;

  pool.query(query, (error, result) => {
    if (error) {
      throw error;
    }

    res.status(200).send("Post Added");
  });
});

app.listen(PORT, async () => {
  try {
    await pool.connect();
    console.log("db connected");
    console.log(`Server running at http://localhost:${PORT}/`);
  } catch (err) {
    console.log("db not connected");
  }
});
