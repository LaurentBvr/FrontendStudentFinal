import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CourseModel } from '../../../../models/course.model';
import { CourseFormComponent } from '../course-form/course-form.component';

@Component({
  selector: 'app-course-form-edition',
  standalone: true,
  imports: [ CourseFormComponent ],
  templateUrl: './course-form-edition.component.html',
  styleUrl: './course-form-edition.component.scss'
})
export class CourseFormEditionComponent {

  @Input() courseToUpdate: CourseModel;

  @Output() cancel = new EventEmitter<void>();
  @Output() courseUpdated = new EventEmitter<CourseModel>();

  public onCancel(): void {
    this.cancel.emit();
  }

  public onCourseUpdated(courseUpdated: CourseModel): void {
    this.courseUpdated.emit(courseUpdated);
  }
}
