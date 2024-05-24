import { UserService } from './../../service/api/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/api/auth.service';
import { MenuRoutes } from '../../constants/routes';
import { MatButtonModule } from '@angular/material/button';
import { PersonModel } from '../../models/person.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ CommonModule, MatButtonModule ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  public currentUserInfo: PersonModel;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  public ngOnInit(): void {
    this.userService.currentUser$
      .subscribe((currentUser: PersonModel) => {
        this.currentUserInfo = currentUser;
      });
  }

  public onLogout(): void {
    localStorage.clear();
    this.authService.setIsLoggedIn(false);
    this.router.navigate([MenuRoutes.LOGIN]);
  }
}
