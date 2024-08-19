import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CourseModel } from '../../../../models/course.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from '../../../../service/api/course.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SnackBarService } from '../../../../service/shared/snack-bar.service';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule ],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent {

  @Input() isEdition: boolean;
  @Input() courseToUpdate: CourseModel;

  @Output() cancel = new EventEmitter<void>();
  @Output() courseCreated = new EventEmitter<CourseModel>();
  @Output() courseUpdated = new EventEmitter<CourseModel>();

  public courseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private snackBarService: SnackBarService
  ) {}

  public ngOnInit(): void {
    this.createForm();

    if (this.isEdition) {
      this.initForm();
    }
  }

  private createForm(): void {
    this.courseForm = this.fb.group({
      name: ['', [Validators.required]], // Champ email avec validation
      courseYear:  ['', [Validators.required]]
    });
  }

  private initForm(): void {
    this.courseForm.patchValue({
      name: this.courseToUpdate.name,
      courseYear: this.courseToUpdate.courseYear,
    })
  }

  private async creationCourse(): Promise<void> {
    try {
      const courseCreated: CourseModel = await this.courseService.
        creatCourse(
          this.courseForm.get('name')?.value,
          this.courseForm.get('courseYear')?.value
        );

      this.snackBarService.openSnackBar("Le cours a bien été créé !", "OK");

      this.courseCreated.emit(courseCreated);
    }
    catch (error) {
      this.snackBarService.openSnackBar("Le cours n'a pas pu être créé !", "OK", null);
    }
  }

  private async editionCourse(): Promise<void> {
    try {
      const courseUpdated: CourseModel = await this.courseService.
        updateCrouse(
          this.courseToUpdate.courseId,
          this.courseForm.get('name')?.value,
          this.courseForm.get('courseYear')?.value,
        );

      this.snackBarService.openSnackBar("Le cours a bien été modifié !", "OK");

      this.courseUpdated.emit(courseUpdated);
    }
    catch (error) {
      this.snackBarService.openSnackBar("Le cours n'a pas pu être édité !", "OK", null);
    }
  }

  public save(): void {
    if (this.courseForm.valid) {
      (this.isEdition) ? this.editionCourse() : this.creationCourse();
    }
  }

  public onCancel(): void {
    this.cancel.emit();
  }
}
