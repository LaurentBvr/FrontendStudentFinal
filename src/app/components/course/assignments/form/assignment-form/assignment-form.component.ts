import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AssignmentModel } from '../../../../../models/assignment.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AssignmentService } from '../../../../../service/api/assignment.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SnackBarService } from '../../../../../service/shared/snack-bar.service';

@Component({
  selector: 'app-assignment-form',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule ],
  templateUrl: './assignment-form.component.html',
  styleUrl: './assignment-form.component.scss'
})
export class AssignmentFormComponent {

  @Input() isEdition: boolean;
  @Input() assignmentToUpdate: AssignmentModel;
  @Input() courseIdAssignmentSelected: string;

  @Output() cancel = new EventEmitter<void>();
  @Output() assignmentCreated = new EventEmitter<AssignmentModel>();
  @Output() assignmentUpdated = new EventEmitter<AssignmentModel>();

  public assignmentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private assignmentService: AssignmentService,
    private snackBarService: SnackBarService
  ) {}

  public ngOnInit(): void {
    this.createForm();

    if (this.isEdition) {
      this.initForm();
    }
  }

  private createForm(): void {
    this.assignmentForm = this.fb.group({
      title: ['', [Validators.required]], // Champ email avec validation
      totalGrade:  ['', [Validators.required]]
    });
  }

  private initForm(): void {
    this.assignmentForm.patchValue({
      title: this.assignmentToUpdate.title,
      totalGrade: this.assignmentToUpdate.totalGrade,
    })
  }

  private async creationAssignment(): Promise<void> {
    try {
      const assignmentCreated: AssignmentModel = await this.assignmentService.
        creatAssignment(
          this.assignmentForm.get('title')?.value,
          this.courseIdAssignmentSelected,
          this.assignmentForm.get('totalGrade')?.value,
        );

      this.snackBarService.openSnackBar("Le travail a bien été créé !", "OK");

      this.assignmentCreated.emit(assignmentCreated);
    }
    catch (error) {
      this.snackBarService.openSnackBar("Le travail n'a pas pu créé !", "OK", null);
    }
  }

  private async editionAssignment(): Promise<void> {
    try {
      const assignmentUpdated: AssignmentModel = await this.assignmentService.
        updateAssignment(
          this.assignmentToUpdate.assignmentId,
          this.assignmentForm.get('title')?.value,
          this.assignmentToUpdate.courseId,
          this.assignmentForm.get('totalGrade')?.value,
        );

      this.snackBarService.openSnackBar("Le travail a bien été modifié !", "OK");

      this.assignmentUpdated.emit(assignmentUpdated);
    }
    catch (error) {
      this.snackBarService.openSnackBar("Le travail n'a pas pu être édité !", "OK", null);
    }
  }

  public save(): void {
    if (this.assignmentForm.valid) {
      (this.isEdition) ? this.editionAssignment() : this.creationAssignment();
    }
  }

  public onCancel(): void {
    this.cancel.emit();
  }
}
