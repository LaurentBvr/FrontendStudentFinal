import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AssignmentFormComponent } from '../assignment-form/assignment-form.component';
import { AssignmentModel } from '../../../../../models/assignment.model';

@Component({
  selector: 'app-assignment-form-creation',
  standalone: true,
  imports: [ AssignmentFormComponent ],
  templateUrl: './assignment-form-creation.component.html',
  styleUrl: './assignment-form-creation.component.scss'
})
export class AssignmentFormCreationComponent {

  @Input() courseIdAssignmentSelected: string;

  @Output() cancel = new EventEmitter<void>();
  @Output() assignmentCreated = new EventEmitter<AssignmentModel>();

  public onCancel(): void {
    this.cancel.emit();
  }

  public onAssignmentreated(assignmentCreated: AssignmentModel): void {
    this.assignmentCreated.emit(assignmentCreated);
  }
}
