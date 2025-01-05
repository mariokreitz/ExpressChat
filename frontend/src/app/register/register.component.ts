import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../auth.service";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: "app-register",
  imports: [FormsModule, CommonModule, RouterModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  name: string = "";
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  errorMessage: string = "";
  showPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Passwörter stimmen nicht überein.";
      return;
    }

    const registerData = {
      username: this.name,
      email: this.email,
      password: this.password,
    };

    this.authService.register(registerData).subscribe({
      next: () => {
        this.router.navigate(["/login"]);
      },
      error: (err) => {
        this.errorMessage = `Fehler bei der Registrierung: ${err.message}`;
      },
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
