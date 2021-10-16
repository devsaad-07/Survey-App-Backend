const admin = require("firebase-admin");
const serviceAccount = require("../ServiceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://surveyapp-72218-default-rtdb.firebaseio.com/",
});
const db = admin.database();

module.exports = db;
