import { Injectable } from '@angular/core';
import { AuthService } from './api/auth.service';
import { Router } from '@angular/router';
import { MenuRoutes } from '../constants/routes';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  public canActivate(): Promise<boolean> {
    return new Promise<boolean>
    ((resolve) => {
      this.authService.isLoggedIn$
        .subscribe((res) => {
          if (res) {
            resolve(true);
          }
          else {
            this.router.navigate([MenuRoutes.LOGIN]);
            resolve(false);
          }
        })
    })
  }
}
