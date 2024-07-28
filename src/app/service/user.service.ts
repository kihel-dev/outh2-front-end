import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = 'http://localhost:8080/api/users'; // URL of backend

  constructor(private http: HttpClient) {}

  // Get user info — relies on the JWT cookie sent with the request
  getUserInfo(): Observable<User> {
    return this.http.get<User>(this.API_URL, { withCredentials: true });
  }
}
