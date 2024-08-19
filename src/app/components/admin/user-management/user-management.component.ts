import { MatButtonModule } from '@angular/material/button';
import { PersonModel } from '../../../models/person.model';
import { UserService } from './../../../service/api/user.service';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { UserFormCreationComponent } from './form/user-form-creation/user-form-creation.component';
import { CommonModule } from '@angular/common';
import { UserFormUpdateComponent } from './form/user-form-update/user-form-update.component';
import { TabUsersComponent } from "./tab-users/tab-users.component";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, UserFormCreationComponent, UserFormUpdateComponent, TabUsersComponent],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent implements OnInit {

  public students: Array<PersonModel> = [];
  public instructors: Array<PersonModel> = [];

  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  public async ngOnInit(): Promise<void> {
    try {
      this.students = await this.userService.getStudents();
      this.instructors = await this.userService.getInstructors();
    } catch (error) {
      this.openSnackBar("Les utilisateurs n'ont pas pu être chargé correctement !", "OK");
    }
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2 * 1000 });
  }
}
