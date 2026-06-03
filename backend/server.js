const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());

server.listen(7000, () => {
  console.log("Server is running on port 7000");
});

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "studentManagement",
});
connection.connect((err) => {
  if (err) {
    console.log("Database not connected");
  } else {
    console.log("Database connected successfully");
  }
});

server.get("/createTable", (req, res) => {
  const sql = `
    CREATE TABLE IF NOT EXISTS student (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255),
      phone VARCHAR(20),
      department VARCHAR(255),
      address VARCHAR(255),
      gender VARCHAR(10)
    )
  `;

  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Table creation failed");
    } else {
      console.log("Table created successfully");
      return res.send("Table created successfully");
    }
  });
});

server.post("/register", (req, res) => {
  const { name, email, phone, department, address, gender } = req.body;

  const sql = `
    INSERT INTO student
    (name, email, phone, department, address, gender)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    sql,
    [name, email, phone, department, address, gender],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.send("Registration failed");
      } else {
        console.log("Student registered successfully");
        return res.send("Student registered successfully");
      }
    },
  );
});

server.get("/students", (req, res) => {
  const sql = "SELECT * FROM student";

  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Failed to fetch students");
    }

    res.json(result);
  });
});

server.get("/students/:id", (req, res) => {
  const sql = "SELECT * FROM student WHERE id = ?";

  connection.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Failed to fetch student");
    }

    if (!result.length) {
      return res.send("Student not found");
    }

    return res.json(result[0]);
  });
});

server.put("/students/:id", (req, res) => {
  const { name, email, phone, department, address, gender } = req.body;

  const sql = `
    UPDATE student
    SET
      name = ?,
      email = ?,
      phone = ?,
      department = ?,
      address = ?,
      gender = ?
    WHERE id = ?
  `;

  connection.query(
    sql,
    [name, email, phone, department, address, gender, req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.send("Update failed");
      }

      if (result.affectedRows === 0) {
        return res.send("Student not found");
      }

      return res.send("Student updated successfully");
    },
  );
});

server.delete("/students/:id", (req, res) => {
  const sql = "DELETE FROM student WHERE id = ?";

  connection.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Delete failed");
    }

    if (result.affectedRows === 0) {
      return res.send("Student not found");
    }

    return res.send("Student deleted successfully");
  });
});
