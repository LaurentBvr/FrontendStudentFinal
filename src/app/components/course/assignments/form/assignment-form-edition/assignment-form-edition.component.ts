import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AssignmentFormComponent } from '../assignment-form/assignment-form.component';
import { AssignmentModel } from '../../../../../models/assignment.model';

@Component({
  selector: 'app-assignment-form-edition',
  standalone: true,
  imports: [ AssignmentFormComponent ],
  templateUrl: './assignment-form-edition.component.html',
  styleUrl: './assignment-form-edition.component.scss'
})
export class AssignmentFormEditionComponent {
  @Input() assignmentToUpdate: AssignmentModel;

  @Output() cancel = new EventEmitter<void>();
  @Output() assignmentUpdated = new EventEmitter<AssignmentModel>();

  public onCancel(): void {
    this.cancel.emit();
  }

  public onAssignmentUpdated(assignmentUpdated: AssignmentModel): void {
    this.assignmentUpdated.emit(assignmentUpdated);
  }
}
