const express = require("express");

// Custom imports
const knex = require("knex");
const knexConfig = require("../knexfile");

const db = knex(knexConfig.development);

const router = express.Router();

router.post("/", (req, res) => {
  const newStudent = req.body;

  if (newStudent.name && newStudent.cohort_id) {
    db("students")
      .insert(newStudent)
      .then(id => {
        res.status(201).json(id[0]);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  } else {
    res.status(400).json({ error: "Please provide a name and cohort id for the student." });
  }
});

router.get("/", (req, res) => {
  db("students")
    .then(students => {
      res.status(200).json(students);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db("students")
    .where({ id })
    .first() // allows you to get out of array
    .then(student => {
      if (student) {
        res.status(200).json(student);
      } else {
        res.status(404).json({ message: 'Record not found.'})
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  if (changes.name) {
    db('students')
    .where({ id })
    .update(changes)
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: 'Record not found.'})
      }
    })
    .catch(error => {
      res.status(500).json(error);
    })
  } else {
    res.status(400).json({ error: "Please provide a name for the student." });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db('students')
    .where({ id })
    .del()
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: 'Record not found.'})
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
