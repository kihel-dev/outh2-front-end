import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../user.model'; // Adjust this path as necessary

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.authService.getUserInfo().subscribe((data: User) => {
      this.user = data; // Set user info
    });
  }

  logout(): void {
    // Call the logout method from AuthService
    this.authService.logout(); 
  }
}
