const WebSocket = require("ws");

const server = new WebSocket.Server(
  {
    port: 8080,
  },
  () => {
    console.log("Server started on port 8080");
  }
);

const users = new Set();

function sendMessage(message) {
  users.forEach((user) => {
    user.ws.send(JSON.stringify(message));
  });
}

server.on("connection", (ws) => {
  const userRef = {
    ws,
  };
  users.add(userRef);

  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message);
      if (typeof data.sender !== "string" || typeof data.room !== "string") {
        console.log(data);
        console.error("Invalid message");
        return;
      }
      console.log("Message: " + data.sender + " - " + data.body);

      const messageToSend = {
        user_id: data.sender,
        message: data.body,
        room: data.room,
      };

      sendMessage(messageToSend);
    } catch (e) {
      console.error("Error passing message!", e);
    }
    console.log(server.clients.size);
  });

  ws.on("close", (code, reason) => {
    users.delete(userRef);
    console.log(`Connection closed: ${code} ${reason}!`);
  });
});
