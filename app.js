require("dotenv").config();

const express = require("express");
const app = express();

const notFound = require("./middleware/not-found");
const ConnectDB = require("./db/connect");
const mainRouter = require("./routes/main");

app.use(express.json());
app.use(express.static("./public"));

app.use("/api/v1", mainRouter);
app.use(notFound);

const port = process.env.PORT || 5000;
const startServer = async () => {
  try {
    app.listen(port, console.log(`App listenting on ${port}`));
  } catch (err) {
    console.log(err);
  }
};
startServer();
