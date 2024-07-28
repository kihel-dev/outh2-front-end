import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.userService.getUserInfo().pipe(
      map((userInfo: User) => true), // UserInfo is used to confirm authentication
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
