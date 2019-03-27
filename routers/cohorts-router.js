const express = require("express");

// Custom imports
const knex = require("knex");
const knexConfig = require("../knexfile");

const db = knex(knexConfig.development);

const router = express.Router();

router.post("/", (req, res) => {
  const newCohort = req.body;

  if (newCohort.name) {
    db("cohorts")
      .insert(newCohort)
      .then(id => {
        res.status(201).json(id[0]);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  } else {
    res.status(400).json({ error: "Please provide a cohort name." });
  }
});

router.get("/", (req, res) => {
  db("cohorts")
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db("cohorts")
    .where({ id })
    .first() // allows you to get out of array
    .then(cohort => {
      if (cohort) {
        res.status(200).json(cohort);
      } else {
        res.status(404).json({ message: 'Record not found.'})
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/:id/students", (req, res) => {
  const { id } = req.params;

  db("students")
    .where({ cohort_id: id })
    .then(student => {
      if (student.length) {
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
    db('cohorts')
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
    res.status(400).json({ error: "Please provide a cohort name." });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db('cohorts')
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
