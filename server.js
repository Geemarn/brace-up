const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

//routers
const users = require("./router/apis/users");
const todos = require("./router/apis/todos");

const app = express();

//allow Access-Control-Allow-Origin
app.use(cors());

//database config
const db = require("./config/keys").mongoURI;
//connect to mongoDB
mongoose
  // .connect("mongodb://localhost/brace_up")
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Datatbase Connected"))
  .catch((err) => console.log(err));

// config bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
// Passport Config
require("./config/passport")(passport);

//import routes
app.use("/users", users);
app.use("/todos", todos);

app.use(
  "/",
  createProxyMiddleware({
    target: "http://localhost:5000",
    changeOrigin: true,
  })
);

/////ready for production/////
//server static asset if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//listen to server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running on PORT:/${port}`));
