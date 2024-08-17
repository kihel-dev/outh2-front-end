import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router'; // Import Router
import { AuthService } from '../../service/auth.service'; // Import AuthService
import { UserService } from '../../service/user.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userInfo!: User;
  message = '';

  constructor(
    private userService: UserService, 
    private authService: AuthService, // Inject AuthService
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe(data => {
      this.userInfo = data;
    }, error => {
      console.error('Error fetching user info:', error);
      this.message = 'Could not load user information.';
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login'], { queryParams: { logout: true } });
      },
      error: (err) => {
        console.error('Logout failed:', err);
      }
    });
  }
}