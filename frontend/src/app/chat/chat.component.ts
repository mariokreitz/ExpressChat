import { Component, OnInit } from "@angular/core";
import { io } from "socket.io-client";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { environment } from "../app.config";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { ChatService } from "../chat.service";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-chat",
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatListModule],
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit {
  onlineUsers: string[] = [];
  messages: { sender: string; content: string }[] = [];
  newMessage: string = "";
  currentUser: any;

  constructor(private chatService: ChatService, private authService: AuthService) {}

  ngOnInit() {
    this.chatService.connect();
    this.currentUser = this.authService.getUserData();
    this.chatService.join(this.currentUser.username);
    this.chatService.onOnlineUsers((users: string[]) => (this.onlineUsers = users));
    this.chatService.onNewMessage((message: { sender: string; content: string }) => {
      this.messages.push(message);
      this.scrollToBottomOfChatMessages();
    });
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      const message = {
        sender: this.currentUser.username,
        content: this.newMessage.trim(),
      };
      this.chatService.sendMessage(message);
      this.newMessage = "";
      this.scrollToBottomOfChatMessages();
    }
  }

  private scrollToBottomOfChatMessages(): void {
    const chatMessagesElement = document.querySelector(".chat-messages") as HTMLElement;
    if (chatMessagesElement) {
      chatMessagesElement.scrollTop = chatMessagesElement.scrollHeight;
    }
  }
}
