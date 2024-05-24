import { MatButtonModule } from '@angular/material/button';
import { PersonModel } from '../../../models/person.model';
import { UserService } from './../../../service/api/user.service';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { UserFormCreationComponent } from './form/user-form-creation/user-form-creation.component';
import { CommonModule } from '@angular/common';
import { UserFormUpdateComponent } from './form/user-form-update/user-form-update.component';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [ CommonModule, MatTableModule, MatButtonModule, UserFormCreationComponent, UserFormUpdateComponent ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent implements OnInit {

  public students: Array<PersonModel> = [];
  public displayedColumns: string[] = ['email', 'firstName', 'lastName', 'action'];

  public showOverlayCreationForm: boolean;
  public showOverlayUpdateForm: boolean;

  public studentToUpdate: PersonModel;

  constructor(private userService: UserService) {}

  public async ngOnInit(): Promise<void> {
    this.students = await this.userService.getStudents();
    console.log(this.students);
  }

  public async onDelete(id: string): Promise<void> {
    try {
      await this.userService.deleteStudentById(id);

      this.students = this.students
        .filter((st: PersonModel) => st.personId != id);

    } catch (error) {
      console.log(error);
    }
  }

  public onUpdate(studentToUpdate: PersonModel): void {
    this.showOverlayUpdateForm = true;
    this.studentToUpdate = studentToUpdate;
  }

  public onStudentCreated(studentCreated: PersonModel): void {
    this.students.push(studentCreated);
  }

  public onStudentUpdated(studentUpdated: PersonModel): void {
    this.students = this.students
        .filter((st: PersonModel) => st.personId != studentUpdated.personId);

    this.students.push(studentUpdated);
  }
}
