import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PersonModel } from '../../../../../models/person.model';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-form-update',
  standalone: true,
  imports: [ UserFormComponent ],
  templateUrl: './user-form-update.component.html',
  styleUrl: './user-form-update.component.scss'
})
export class UserFormUpdateComponent {

  @Input() studentToUpdate: PersonModel;

  @Output() cancel = new EventEmitter<void>();
  @Output() studentUpdated = new EventEmitter<PersonModel>();

  public onCancel(): void {
    this.cancel.emit();
  }

  public onStudentUpdated(studentUpdated: PersonModel): void {
    this.studentUpdated.emit(studentUpdated);
  }
}
