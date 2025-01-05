import { Injectable } from "@angular/core";
import { io, Socket } from "socket.io-client";
import { environment } from "./app.config";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  private socket: Socket;

  constructor() {
    const token = JSON.parse(sessionStorage.getItem("authToken") || "null");

    this.socket = io(environment.socketUrl, {
      query: { token },
    });
  }

  join(currentUser: string): void {
    this.socket.emit("join", currentUser);
  }

  onOnlineUsers(callback: (onlineUsers: string[]) => void): void {
    this.socket.on("onlineUsers", (onlineUsers) => callback(onlineUsers));
  }

  sendMessage(message: { timestamp: number; sender: string; content: string }): void {
    this.socket.emit("sendMessage", message);
  }

  onNewMessage(callback: (message: { timestamp: Date; sender: string; receiver: string; content: string }) => void): void {
    this.socket.on("newMessage", callback);
  }

  connect(currentUser: string): void {
    this.socket.on("connect", () => {
      console.log("Verbindung hergestellt!");
      this.sendMessage({ timestamp: Date.now(), sender: currentUser, content: "hat den Chat betreten" });
    });
  }

  disconnect(): void {
    this.socket.disconnect();
  }
}
