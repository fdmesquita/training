const express = require("express");
const mysql = require("../config/db");
const router = express.Router();

router.get("/", (req, res) => {
  const sql = `SELECT * FROM hokages`;
  mysql.query(sql, (err, result) => {
    if (err) {
      res.status(500).send("error retrieving data");
    } else {
      console.table(result);
      res.status(200).json(result);
    }
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM hokages WHERE hokageID = ?`;
  const values = [id];
  mysql.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).send("error retrieving this data");
    } else {
      console.table(result);
      res.status(200).json(result);
    }
  });
});

router.post("/", (req, res) => {
  const sql = `INSERT INTO hokages (villageName) VALUES (?)`;
  const values = [req.body.villageName];
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
  const sql = `UPDATE hokages SET ? WHERE hokageID = ?`;
  console.log(req.body);
  const values = [req.body, id];
  mysql.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).send("error modifying data");
    } else {
      console.table(result);
      res.status(200).json(result);
    }
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE hokages SET ? WHERE hokageID = ?`;
  const values = [id];
  mysql.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).send("error deleting data");
    } else {
      console.table(result);
      res.status(200).json(result);
    }
  });
});

module.exports = router;
