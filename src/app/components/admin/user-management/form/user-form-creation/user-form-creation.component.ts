import { Component, EventEmitter, Output } from '@angular/core';
import { UserFormComponent } from '../user-form/user-form.component';
import { PersonModel } from '../../../../../models/person.model';

@Component({
  selector: 'app-user-form-creation',
  standalone: true,
  imports: [ UserFormComponent ],
  templateUrl: './user-form-creation.component.html',
  styleUrl: './user-form-creation.component.scss'
})
export class UserFormCreationComponent {

  @Output() cancel = new EventEmitter<void>();
  @Output() studentCreated = new EventEmitter<PersonModel>();

  public onCancel(): void {
    this.cancel.emit();
  }

  public onStudentCreated(studentCreated: PersonModel): void {
    console.log("UserFormCreationComponent: ", studentCreated);

    this.studentCreated.emit(studentCreated);
  }
}
