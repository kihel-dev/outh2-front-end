import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  private API_URL = 'http://localhost:8080'; // URL de backend

  loginWithGoogle(): void {
    window.location.href = `${this.API_URL}/oauth2/authorization/google`; // Redirige vers Google
  }

  loginWithFacebook(): void {
    window.location.href = `${this.API_URL}/oauth2/authorization/facebook`; // Redirige vers Facebook
  }

  loginWithGithub(): void {
    window.location.href = `${this.API_URL}/oauth2/authorization/github`; // Redirige vers GitHub
  }

  loginWithLinkedIn(): void {
    window.location.href = `${this.API_URL}/oauth2/authorization/linkedin`; // Redirige vers LinkedIn
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/logout`, {}, { withCredentials: true });
  }
}
