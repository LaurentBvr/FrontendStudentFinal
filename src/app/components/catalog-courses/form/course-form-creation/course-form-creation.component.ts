import { Component, EventEmitter, Output } from '@angular/core';
import { CourseFormComponent } from '../course-form/course-form.component';
import { CourseModel } from '../../../../models/course.model';

@Component({
  selector: 'app-course-form-creation',
  standalone: true,
  imports: [ CourseFormComponent ],
  templateUrl: './course-form-creation.component.html',
  styleUrl: './course-form-creation.component.scss'
})
export class CourseFormCreationComponent {

  @Output() cancel = new EventEmitter<void>();
  @Output() courseCreated = new EventEmitter<CourseModel>();

  public onCancel(): void {
    this.cancel.emit();
  }

  public onCourseCreated(courseCreated: CourseModel): void {
    this.courseCreated.emit(courseCreated);
  }
}
