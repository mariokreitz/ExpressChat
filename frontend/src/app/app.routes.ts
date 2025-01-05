import { Routes } from "@angular/router";
import { ChatComponent } from "./chat/chat.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthGuardService } from "./auth-guard.service";

export const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "chat", component: ChatComponent, canActivate: [AuthGuardService] },
  { path: "", redirectTo: "/login", pathMatch: "full" },
];
