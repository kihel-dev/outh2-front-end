import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  loginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }

  loginWithFacebook(): void {
    this.authService.loginWithFacebook();
  }

  loginWithGitHub(): void {
    this.authService.loginWithGitHub();
  }
}
