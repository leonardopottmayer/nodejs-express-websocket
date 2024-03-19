const express = require("express");
const { WebSocketServer } = require("ws");

// Creates the express instance
const app = express();

// Define the html file that will be returned to the client
app.use((req, res) =>
  res.sendFile("/websocket-client.html", { root: __dirname })
);

// Start the express server on port 3000
app.listen(3000, () => console.log(`Listening on ${3000}`));

// Create a WebSocket server
const sockserver = new WebSocketServer({ port: 443 });

// Define the function that will be executed when some client connects to the server
sockserver.on("connection", (ws) => {
  console.log("New client connected!");

  // Sends a message to the client
  ws.send("connection established");

  // Define the function that will be executed when the client disconnects from the socket
  ws.on("close", () => console.log("Client has disconnected!"));

  // Define the function that will be executed when the server receives a message from a client
  ws.on("message", (data) => {
    // Send the received message for each of the connected clients
    sockserver.clients.forEach((client) => {
      console.log(`Distributing message: ${data}`);
      client.send(`${data}`);
    });
  });

  // Define the function that will be executed when an error happens
  ws.onerror = function () {
    console.log("websocket error");
  };
});
