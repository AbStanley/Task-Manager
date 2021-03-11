// routes.js
// Jeremy Campbell 

const express = require("express");
const todoform = require("./todo-form");
const {addItem, saveSession, removeDone} = require("./control");

var router = express.Router();

router
    .get("/", todoform)
    .get("/styles/todo.css", express.static("static"))
    .post("/add", addItem)
    .post("/save", saveSession)
    .post("/remove", removeDone);

module.exports = router;