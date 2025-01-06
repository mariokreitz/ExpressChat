import express from "express";
import https from "https";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "mongoose";
import fs from "fs";

import authRoutes from "./src/routes/auth.js";
import authMiddleware from "./src/middleware/authMiddleware.js";
import Message from "./src/models/Message.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

const options = {
  cert: fs.readFileSync("/etc/ssl/certs/fullchain.pem"),
  key: fs.readFileSync("/etc/ssl/private/privkey.pem"),
};

const server = https.createServer(options, app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "OPTION"],
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
    const newMessage = new Message({
      timestamp: data.timestamp,
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
    const PORT = process.env.PORT || 443;
    server.listen(PORT, () => {
      console.log(`HTTPS Server läuft auf Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Datenbankverbindung fehlgeschlagen:", err);
  });
