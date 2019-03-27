const express = require("express");

// Custom imports
const knex = require("knex");
const knexConfig = require("../knexfile");

const db = knex(knexConfig.development);

const router = express.Router();

router.get("/", (req, res) => {
  db("bears")
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db("bears")
    .where({ id })
    .first() // allows you to get out of array
    .then(bear => {
      if (bear) {
        res.status(200).json(bear);
      } else {
        res.status(404).json({ message: 'Record not found.'})
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/", (req, res) => {
  const newBear = req.body;

  if (newBear.name) {
    db("bears")
      .insert(newBear)
      .then(id => {
        res.status(201).json(id[0]);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  } else {
    res.status(400).json({ error: "Please provide a name for the bear." });
  }
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  if (changes.name) {
    db('bears')
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
    res.status(400).json({ error: "Please provide a name for the bear." });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db('bears')
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
