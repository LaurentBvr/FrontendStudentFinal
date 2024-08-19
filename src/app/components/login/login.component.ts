import { AuthService } from './../../service/api/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MenuRoutes } from '../../constants/routes';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { JwtService } from '../../service/jwt.service';
import { Roles } from '../../constants/roles';
import { UserService } from '../../service/api/user.service';
import { PersonModel } from '../../models/person.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule,ReactiveFormsModule,MatInputModule,MatFormFieldModule,MatIconModule,RouterModule, MatButtonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements  OnInit{

  public loginForm : FormGroup;
  public hide: boolean = true;
  public routes: MenuRoutes = MenuRoutes;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private jwtService: JwtService,
    private userService: UserService
  ) {

  }

  public ngOnInit(): void {
    this.creatForm();
    this.autoLoging();
  }

  private creatForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  public navToRegister(): void {
    this.router.navigate([MenuRoutes.REGISTER]);
  }

  /**
   * ! Login modifié pour test !
   */
  public async login(): Promise<void> {
    if (this.loginForm.valid) {
      try {
        const respons: any = await this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value);

        localStorage.setItem('token', respons.token);

        const currentUser: PersonModel = {
          personId: this.jwtService.getsId(),
          email: this.jwtService.getEmail(),
          firstName: this.jwtService.getFirstName(),
          lastName: this.jwtService.getLastName(),
          role: this.jwtService.getRole().toUpperCase()
        }


        // const currentUser: PersonModel = {
        //   personId: "id",
        //   email: "user@gmail.com",
        //   firstName: "Max",
        //   lastName: "Test",
        //   role: Roles.INSTRUCTOR
        // }
        console.log(currentUser);

        this.userService.setCurrentUser(currentUser);

        if (currentUser.role == Roles.ADMIN) {
          this.router.navigate([MenuRoutes.ADMIN, MenuRoutes.DASHBOAR, MenuRoutes.USER_MANAGEMENT]);
        }
        else if (currentUser.role == Roles.STUDENT) {
          this.router.navigate([MenuRoutes.STUDENT, MenuRoutes.DASHBOAR, MenuRoutes.CATALOG_COURSES]);
        }
        else if (currentUser.role == Roles.INSTRUCTOR) {
          this.router.navigate([MenuRoutes.INSTRUCTOR, MenuRoutes.DASHBOAR, MenuRoutes.CATALOG_COURSES]);
        }
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  /**
   * ! Login modifié pour test !
   */
  public async autoLoging(): Promise<any> {
    const token = localStorage.getItem('token');

    //const token = true;

    if (token) {
      try {
        await this.authService.validateToken(token);

        const currentUser: PersonModel = {
          personId: this.jwtService.getsId(),
          email: this.jwtService.getEmail(),
          firstName: this.jwtService.getFirstName(),
          lastName: this.jwtService.getLastName(),
          role: this.jwtService.getRole().toUpperCase()
        }

        // const currentUser: PersonModel = {
        //   personId: "id",
        //   email: "user@gmail.com",
        //   firstName: "Max",
        //   lastName: "Test",
        //   role: Roles.INSTRUCTOR
        // }

        this.userService.setCurrentUser(currentUser);

        console.log(currentUser);


        if (currentUser.role == Roles.ADMIN) {
          this.router.navigate([MenuRoutes.ADMIN, MenuRoutes.DASHBOAR, MenuRoutes.USER_MANAGEMENT]);
        }
        else if (currentUser.role == Roles.STUDENT) {
          this.router.navigate([MenuRoutes.STUDENT, MenuRoutes.DASHBOAR, MenuRoutes.CATALOG_COURSES]);
        }
        else if (currentUser.role == Roles.INSTRUCTOR) {
          this.router.navigate([MenuRoutes.INSTRUCTOR, MenuRoutes.DASHBOAR, MenuRoutes.CATALOG_COURSES]);
        }
      }
      catch (error) {
        console.log(error);
      }
    }
  }
}
