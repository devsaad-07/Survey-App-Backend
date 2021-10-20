const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use(cors());

const pingRouter = require("./routes/ping");
app.use("/", pingRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
