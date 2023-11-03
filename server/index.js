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

app.get("/healthcheck",(req,res)=>{
  res.send({
    success:true
  })
})

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/getAllPosts", (req, res) => {
  const query = `SELECT * FROM post`;
  pool.query(query, (error, result) => {
    if (error) {
      throw error;
    }
    console.log(result.rows);
    res.status(200).send(result.rows);
  });
});

app.get("/getUser/:email", (req, res) => {
  const email = req.params.email;
  console.log(req.params);
  const query = `SELECT username FROM users WHERE email='${email}'`;
  pool.query(query, (error, result) => {
    if (error) {
      throw error;
    }

    res.status(200).send(result.rows);
  });
});

app.post("/likePosts", (req, res) => {
  const username = req.body.username;
  const post = req.body.post;
  const postid = req.body.postid;
  const query = `SELECT likes FROM post WHERE post = ('${post}') `;
  let likeArray;
  let length;

  pool.query(query, (error, result) => {
    if (error) {
      throw error;
    }

    likeArray = result.rows[0].likes[postid];
    length = likeArray.length();
  });

  if (length === 0) {
    const query1 = `INSERT INTO post (likes, post) VALUES (${username}, ${post}})`;
    pool.query(query1, (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).send("Username stored in likes array.");
    });
  } else {
    const query1 = `UPDATE post SET likes = array_append(likes, ${username}) WHERE post = ${post}`;

    pool.query(query1, (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).send("Username stored in likes array.");
    });
  }
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
  const query = `INSERT INTO post (username,post) VALUES ('${username}','${content}')`;

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
