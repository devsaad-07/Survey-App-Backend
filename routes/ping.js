const express = require("express");
const cors = require("cors");
const admin = require("../configs/firebaseconfig");
const nodemailer = require("nodemailer");
const db = admin.database();
const router = express.Router();

router.options("/", cors());
router.get("/", cors(), (req, res) => {
  res.send("Hi");
});

router.options("/send-email", cors());
router.post("/send-email", cors(), (req, res) => {
  // List batch of users, 1000 at a time.
  const surveyid = req.body.id;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "saad.1@iitj.ac.in",
      pass: "devsaadiitj07",
    },
  });
  admin
    .auth()
    .listUsers(1000)
    .then((listUsersResult) => {
      listUsersResult.users.forEach((userRecord) => {
        const mailOptions = {
          from: "saad.1@iitj.ac.in",
          to: userRecord.email,
          subject: "Please give this amazing survey!",
          text: `Hi, Please give this survey, the link is https://survey-app-frontend.herokuapp.com/?action=submit&surveyid=${surveyid}`,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      });
      res.send("Email sent");
    })
    .catch((error) => {
      console.log("Error listing users:", error);
      res.send(error);
    });
});

router.options("/sign-up", cors());
router.post("/sign-up", cors(), (req, res) => {
  const user = req.body;
  admin
    .auth()
    .createUser({
      name: user.name,
      email: user.email,
      password: user.password,
      gender: user.gender,
      age: user.age,
    })
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      res.send(user);
      console.log("Successfully created new user:", userRecord.uid);
    })
    .catch((error) => {
      res.send(error);
      console.log("Error creating new user:", error);
    });
});

router.options("/create_survey", cors());
router.post("/create_survey", cors(), (req, res) => {
  const survey = req.body;
  res.send(
    db.ref(`/Survey-App/Surveys`).push({
      Questions: survey,
    })
  );
});

router.options("/get_survey/:surveyID", cors());
router.get("/get_survey/:surveyID", cors(), (req, res) => {
  const survey = {};
  db.ref(`/Survey-App/Surveys/${req.params.surveyID}/Questions`).once(
    "value",
    function (snapshot) {
      snapshot.forEach(function (child) {
        survey[child.key] = child.val();
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
