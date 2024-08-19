import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MenuRoutes } from '../../constants/routes';
import { Roles } from '../../constants/roles';
import { UserService } from '../../service/api/user.service';
import { PersonModel } from '../../models/person.model';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ CommonModule, MatButtonModule ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

  private currentUserInfo: PersonModel;

  public menuRoutes: typeof MenuRoutes = MenuRoutes;
  public roleType: typeof Roles = Roles;
  public isUserManagement: boolean = true;
  public isCoursManagement: boolean;
  public isStudent: boolean;
  public isInstructor: boolean;
  public isAdmin: boolean;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  public ngOnInit(): void {
    this.userService.currentUser$
      .subscribe((currentUser: PersonModel) => {
        this.currentUserInfo = currentUser;

        this.isStudent = this.currentUserInfo.role == this.roleType.STUDENT;
        this.isInstructor = this.currentUserInfo.role == this.roleType.INSTRUCTOR;
        this.isAdmin = this.currentUserInfo.role == this.roleType.ADMIN;
      });
  }

  public onNavigation(route: string): void {
    let path: Array<string> = [];

    if (this.currentUserInfo.role == Roles.ADMIN) path = [MenuRoutes.ADMIN, MenuRoutes.DASHBOAR];
    else if (this.currentUserInfo.role == Roles.STUDENT) path = [MenuRoutes.STUDENT, MenuRoutes.DASHBOAR];
    else if (this.currentUserInfo.role == Roles.INSTRUCTOR) path = [MenuRoutes.INSTRUCTOR, MenuRoutes.DASHBOAR];

    this.isUserManagement = route == MenuRoutes.USER_MANAGEMENT;
    this.isCoursManagement = route == MenuRoutes.COURSE_MANAGEMENT;

    path.push(route);

    this.router.navigate(path)
  }
}
