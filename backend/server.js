import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "mongoose";

import authRoutes from "./src/routes/auth.js";
import authMiddleware from "./src/middleware/authMiddleware.js";
import Message from "./src/models/Message.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.use(authMiddleware);

io.on("connection", (socket) => {
  console.log("Ein Benutzer hat sich verbunden.");

  socket.on("join", (username) => {
    socket.data.username = username;
    const onlineUsers = Array.from(io.sockets.sockets.values()).map((s) => s.data.username);
    io.emit("onlineUsers", onlineUsers);
  });

  socket.on("sendMessage", async (data) => {
    console.log("Nachricht empfangen:", data);

    const newMessage = new Message({
      sender: data.sender,
      content: data.content,
    });

    await newMessage.save();

    io.emit("newMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("Ein Benutzer hat die Verbindung getrennt.");
    const onlineUsers = Array.from(io.sockets.sockets.values()).map((s) => s.data.username);
    io.emit("onlineUsers", onlineUsers);
  });
});

connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mit MongoDB verbunden");
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(`Server läuft auf http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Datenbankverbindung fehlgeschlagen:", err);
  });
