import { AssignmentService } from './../../../service/api/assignment.service';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Roles } from '../../../constants/roles';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AssignmentModel } from '../../../models/assignment.model';
import { MatMenuModule } from '@angular/material/menu';
import { AssignmentFormCreationComponent } from "./form/assignment-form-creation/assignment-form-creation.component";
import { AssignmentFormEditionComponent } from "./form/assignment-form-edition/assignment-form-edition.component";
import { SnackBarService } from '../../../service/shared/snack-bar.service';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule, AssignmentFormCreationComponent, AssignmentFormEditionComponent],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.scss'
})
export class AssignmentsComponent implements OnInit, OnChanges {

  @Input() role: Roles;
  @Input() courseIdAssignmentSelected: string;

  public isStudent: boolean;
  public isInstructor: boolean;
  public isAdmin: boolean;

  public roleType: typeof Roles = Roles;

  public isAssignmentListView: boolean = true;

  public isCreationAssignmentFormView: boolean;
  public isEditionAssignmentFormView: boolean;
  public isAddFileToAssigmentByStudent: boolean;

  public assignmentToUpdate: AssignmentModel;

  // public assignments: Array<AssignmentModel> = [
  //   { assignmentId: "1", title: "Test 1", courseId: "course1", totalGrade: 20 },
  //   { assignmentId: "2", title: "Test 2", courseId: "course1", totalGrade: 30 },
  //   { assignmentId: "3", title: "Devoire 1", courseId: "course1", totalGrade: 20 },
  // ]

  public assignments: Array<AssignmentModel> = [];

  constructor(
    private assignmentService: AssignmentService,
    private snackBarService: SnackBarService
  ) {}

  public ngOnInit(): void {
    this.isStudent = this.role == this.roleType.STUDENT;
    this.isInstructor = this.role == this.roleType.INSTRUCTOR;
    this.isAdmin = this.role == this.roleType.ADMIN;
  }

  public async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes['courseIdAssignmentSelected']) {

      try {
        this.assignments = await this.assignmentService
          .getAssignmentsByCourseId(changes['courseIdAssignmentSelected'].currentValue);

      } catch (error) {
        this.snackBarService.openSnackBar("Les travaux n'ont pas pu être chargé !", "OK", null);
      }

    }
  }

  public editAssignment(assignment: AssignmentModel): void {
    this.assignmentToUpdate = assignment;
    this.isEditionAssignmentFormView = true;
    this.isAssignmentListView = false
  }

  public onAssignmentCreated(assignmentCreated: AssignmentModel): void {
    if (assignmentCreated) {
      this.isAssignmentListView = true;
      this.isCreationAssignmentFormView = false;
      this.assignments.push(assignmentCreated);
    }
  }

  public onAssignmentUpdated(assignmentUpdeted: AssignmentModel): void {
    if (assignmentUpdeted) {
      this.isEditionAssignmentFormView = false;
      this.isAssignmentListView = true;

      this.assignments = this.assignments
        .filter((a: AssignmentModel) => a.assignmentId != assignmentUpdeted.assignmentId);

      this.assignments.push(assignmentUpdeted);
    }
  }

  public async deleteAssignment(assignmentId: string): Promise<void> {
    try {
      await this.assignmentService.deleteStudentById(assignmentId);

      this.assignments = this.assignments
        .filter((a: AssignmentModel) => a.assignmentId != assignmentId);

      this.snackBarService.openSnackBar("Le travail a bien été supprimé !", "OK");
    } catch (error) {
      this.snackBarService.openSnackBar("Le travail n'a pas pu être supprimé !", "OK", null);
    }

  }

  public submitAWork(): void {
    this.isAssignmentListView = false;
    this.isAddFileToAssigmentByStudent = true;
  }
}
