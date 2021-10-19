const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const pingRouter = require("./routes/ping");
app.use("/", pingRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
