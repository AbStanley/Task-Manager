// server.js
// Entry point for To-Do
const http = require("http");
const {app} = require("./app");

const server = http.createServer(app);

// Start server
server.listen(8000, () => {
    console.log("Listening on port 8000...");
});