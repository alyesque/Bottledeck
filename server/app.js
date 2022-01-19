const express = require("express");
const app = express();
const users = require("./routes/user.js");
const decks = require("./routes/deck.js");
const connectDB = require("./db/connect");
require("dotenv").config();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const verifyJWT = require("./middleware/verifyJwt.js");
const path = require("path");

const port = process.env.PORT || 3001;

app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(express.json({ limit: "50mb" }));
app.use("/api/v1/users", users);
app.use("/api/v1/decks", decks);
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 5000000 })
);

app.use(
  cors({
    origin: "*",
    methods: "POST",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);
app.options("*", cors());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/isUserAuth", verifyJWT, (req, res) => {
  res.send(true);
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`listening on port: ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
