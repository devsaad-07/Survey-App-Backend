const express = require("express");
const db = require("../configs/firebaseconfig");

const router = express.Router();

router.get("/ping", (req, res) => {
  db.ref("/sampleData/" + "alanIsAwesome").set({
    date_of_birth: "June 23, 1912",
    full_name: "Alan Turing",
  });
  res.send("pong");
});

module.exports = router;
