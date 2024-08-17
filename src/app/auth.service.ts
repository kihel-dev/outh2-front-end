import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './user.model'; // Ensure this path is correct and the model is defined

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/users'; // Your backend URL

  constructor(private http: HttpClient, private router: Router) {}

  // Redirect to Google OAuth2 login
  loginWithGoogle(): void {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }

  // Redirect to Facebook OAuth2 login
  loginWithFacebook(): void {
    window.location.href = 'http://localhost:8080/oauth2/authorization/facebook';
  }

  // Redirect to GitHub OAuth2 login
  loginWithGitHub(): void {
    window.location.href = 'http://localhost:8080/oauth2/authorization/github';
  }

  // Get user information from the backend
  getUserInfo(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`); 
  }

  // Implement the logout function, directing the user to the login page
  logout(): void {
    // Implement any necessary cleanup here (e.g., removing tokens if you store them)
    this.router.navigate(['/login']); // Navigate back to the login page
  }
}
