const express = require("express");
const cors = require("cors");
const db = require("../configs/firebaseconfig");

const router = express.Router();

router.options("/", cors());
router.get("/", cors(), (req, res) => {
  res.send("Hi");
});

router.options("/sign-up", cors());
router.post("/sign-up", cors(), (req, res) => {
  const user = req.body;
  db.ref(`/Survey-App/Users`).push(user);
  res.send(user);
});

router.options("/create_survey", cors());
router.post("/create_survey", cors(), (req, res) => {
  const survey = req.body;
  db.ref(`/Survey-App/Surveys`).push({
    Questions: survey,
  });
  res.send(survey);
});

router.options("/get_survey/:surveyID", cors());
router.get("/get_survey/:surveyID", cors(), (req, res) => {
  const survey = {};
  db.ref(`/Survey-App/Surveys/${req.params.surveyID}/Questions`).once(
    "value",
    function (snapshot) {
      snapshot.forEach(function (child) {
        survey[child.key] = child.val();
        // console.log(`${child.key}: ${child.val()}`);
        // console.log(survey);
      });
      res.send(survey);
    }
  );
});

router.options("/submit_survey/:surveyID/:userID", cors());
router.post("/submit_survey/:surveyID/:userID", cors(), (req, res) => {
  const answers = req.body;
  db.ref(
    `/Survey-App/Surveys/${req.params.surveyID}/Answers/${req.params.userID}`
  ).set(answers);
  res.send("Answers Saved!");
});

module.exports = router;
