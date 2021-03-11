// app/index.js
// Application for To-Do. Exports "app"
const express = require("express");
const morgan = require("morgan");
const expressSession = require("express-session");
const sessionFileStore = require("session-file-store");
const bodyParser = require("body-parser");
const todoRouter = require("./todo/routes");
const {defaultNotFound} = require("./common");

const app = express();

// Logging
app.use(morgan("dev"));

// Session Creation
const fileStore = sessionFileStore(expressSession);
app.use(expressSession({
    secret: "spider-man",
    saveUninitialized: false,
    resave: false,
    store: new fileStore(),
}));

// Use the body-parser to get post data
app.use(bodyParser.urlencoded({extended: true}));

// Main page 
app.use("/todo", todoRouter);

// No path is specified
app.use(express.static("static"));

// Defaults
app.use(defaultNotFound);

// Export
module.exports = {app};   