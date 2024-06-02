require("dotenv").config();

const express = require("express");
const notFound = require("./middleware/not-found");
const app = express();

app.use(express.json());
app.use(express.static("./public"));

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
