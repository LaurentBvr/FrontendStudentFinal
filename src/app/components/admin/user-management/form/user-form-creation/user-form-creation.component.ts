import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserFormComponent } from '../user-form/user-form.component';
import { PersonModel } from '../../../../../models/person.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form-creation',
  standalone: true,
  imports: [ CommonModule, UserFormComponent ],
  templateUrl: './user-form-creation.component.html',
  styleUrl: './user-form-creation.component.scss'
})
export class UserFormCreationComponent {

  @Input() isStudents: Boolean;

  @Output() cancel = new EventEmitter<void>();
  @Output() userCreated = new EventEmitter<PersonModel>();

  public onCancel(): void {
    this.cancel.emit();
  }

  public onUserCreated(userCreated: PersonModel): void {
    this.userCreated.emit(userCreated);
  }
}
