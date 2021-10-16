const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

const homeRouter = require("./routes/home");
app.use("/", homeRouter);
const pingRouter = require("./routes/ping");
app.use("/", pingRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
