const express = require("express");
const mysql = require("../config/db");

const router = express.Router();

router.get("/", (req, res) => {
  const sql = "SELECT * FROM characters";
  mysql.query(sql, (err, result) => {
    if (err) {
      res.status(500).send("Error retrieving data from database");
    } else {
      console.table(result);
      res.status(200).json(result);
    }
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM characters WHERE id = ?";
  const values = [id];
  mysql.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).send("Error retrieving data from database");
    } else {
      console.table(result);
      res.status(200).json(result);
    }
  });
});

router.post("/", (req, res) => {
  const sql = `INSERT INTO characters (firstname, lastname, birthday, bio) VALUES (?, ?, ?, ?)`;
  const values = [
    req.body.firstname,
    req.body.lastname,
    req.body.birthday,
    req.body.bio,
  ];

  mysql.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.table(result);
      res.status(200).json(result);
    }
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const sql = `UPDATE characters SET ? WHERE id = ?`;
  console.log(req.body);
  const values = [req.body, id];
  mysql.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).send("Error retrieving data from database");
    } else {
      console.table(result);
      res.status(200).json(result);
    }
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM characters WHERE id = ?`;
  const values = [id];
  mysql.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).send("Error retrieving data from database");
    } else {
      console.table(result);
      res.status(200).json(result);
    }
  });
});

module.exports = router;
