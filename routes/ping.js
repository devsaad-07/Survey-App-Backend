const express = require("express");
const db = require("../configs/firebaseconfig");

const router = express.Router();

// function stringToHash(string) {
//   var hash = 0;

//   if (string.length == 0) return hash;

//   for (i = 0; i < string.length; i++) {
//     char = string.charCodeAt(i);
//     hash = (hash << 5) - hash + char;
//     hash = hash & hash;
//   }

//   return hash;
// }

router.post("/sign-up", (req, res) => {
  const user = req.body;
  db.ref(`/Survey-App/Users`).push(user);
  res.send(user);
});

router.post("/create_survey", (req, res) => {
  const survey = req.body;
  const dbRef = db.ref(`/Survey-App/Surveys`).push({
    Questions: survey,
  });
  res.send(survey);
});

router.get("/get_survey/:surveyID", (req, res) => {
  db.ref(`/Survey-App/Surveys/${req.params.surveyID}/Questions`).once(
    "value",
    function (snapshot) {
      snapshot.forEach(function (child) {
        console.log(child.key + ": " + child.val());
      });
    }
  );
  res.send("pong");
});

router.post("/submit_survey/:surveyID/:userID", (req, res) => {
  const answers = req.body;
  db.ref(
    `/Survey-App/Surveys/${req.params.surveyID}/Answers/${req.params.userID}`
  ).set(answers);
  res.send("pong");
});

module.exports = router;
