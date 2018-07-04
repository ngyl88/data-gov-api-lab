const express = require("express");
const router = express.Router();

const kindergarten = require("../utils/kindergarten.json");

// TODO: Create CRUD endpoints for your data!

router.get("/", (req, res, next) => {
  if (Object.keys(req.query).length === 0)
    res.json("Hi from Kindergarten Router!");
  else next();
});

router.get("/", (req, res) => {
  const filteredKindergarten = Object.keys(req.query).reduce(
    (accumulator, queryKey) => {
      console.log(`currentKey: ${queryKey}, req.query[queryKey] ${req.query[queryKey]}, filtered from ${accumulator.length} data`);
      return accumulator.filter(
        kindergarten => kindergarten[queryKey] === req.query[queryKey]
      );
    },
    kindergarten
  );
  res.json(filteredKindergarten);
});

router.get("/list", (req, res) => {
  res.json(kindergarten);
});

module.exports = router;
