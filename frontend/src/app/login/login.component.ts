import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../auth.service";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
  selector: "app-login",
  imports: [FormsModule, CommonModule, RouterModule, MatFormFieldModule, MatInputModule],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  errorMessage: string = "";

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const loginData = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(loginData).subscribe({
      next: (response) => {
        sessionStorage.setItem("authToken", JSON.stringify(response.token));
        this.authService.setUserData(response.user);
        this.router.navigate(["/chat"]);
      },
      error: (err) => {
        this.errorMessage = `Fehler beim Login: ${err.message}`;
      },
    });
  }
}
