import { Component, OnInit, OnDestroy } from "@angular/core";
import { ChatService } from "../chat.service";
import { AuthService } from "../auth.service";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: "app-chat",
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
  ],
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit, OnDestroy {
  onlineUsers: string[] = [];
  messages: { timestamp: Date; sender: string; content: string }[] = [];
  newMessage: string = "";
  currentUser: { email: string; registered: string; status: string; username: string } = {
    email: "unknown",
    registered: "unknown",
    status: "unknown",
    username: "unknown",
  };

  constructor(private chatService: ChatService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getUserData();
    this.chatService.connect(this.currentUser.username);

    this.chatService.join(this.currentUser.username);
    this.chatService.onOnlineUsers((users: string[]) => {
      this.onlineUsers = users;
    });

    this.chatService.onNewMessage((message: { timestamp: Date; sender: string; content: string }) => {
      this.messages.push(message);
      this.scrollToBottomOfChatMessages();
    });
  }

  ngOnDestroy(): void {
    this.chatService.disconnect();
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      const message = {
        timestamp: Date.now(),
        sender: this.currentUser.username,
        content: this.newMessage.trim(),
      };
      this.chatService.sendMessage(message);
      this.newMessage = "";
      this.scrollToBottomOfChatMessages();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

  private scrollToBottomOfChatMessages(): void {
    const chatMessagesElement = document.querySelector(".chat-messages") as HTMLElement;
    if (chatMessagesElement) {
      chatMessagesElement.scrollTop = chatMessagesElement.scrollHeight;
    }
  }
}
