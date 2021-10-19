const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Origin",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const pingRouter = require("./routes/ping");
app.use("/", pingRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
