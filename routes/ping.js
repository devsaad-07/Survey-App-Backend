const express = require("express");
const db = require("../configs/firebaseconfig");

const router = express.Router();

router.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  res.send("Hi");
});
router.post("/sign-up", (req, res) => {
  const user = req.body;
  db.ref(`/Survey-App/Users`).push(user);
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  res.send(user);
});

router.post("/create_survey", (req, res) => {
  const survey = req.body;
  db.ref(`/Survey-App/Surveys`).push({
    Questions: survey,
  });
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  res.send(survey);
});

router.get("/get_survey/:surveyID", (req, res) => {
  const survey = {};
  db.ref(`/Survey-App/Surveys/${req.params.surveyID}/Questions`).once(
    "value",
    function (snapshot) {
      snapshot.forEach(function (child) {
        survey[child.key] = child.val();
        // console.log(`${child.key}: ${child.val()}`);
        // console.log(survey);
      });
      res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
      res.send(survey);
    }
  );
});

router.post("/submit_survey/:surveyID/:userID", (req, res) => {
  const answers = req.body;
  db.ref(
    `/Survey-App/Surveys/${req.params.surveyID}/Answers/${req.params.userID}`
  ).set(answers);
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  res.send("Answers Saved!");
});

module.exports = router;
