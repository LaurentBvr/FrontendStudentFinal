import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PersonModel } from '../../../../../models/person.model';
import { UserFormComponent } from '../user-form/user-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form-update',
  standalone: true,
  imports: [ CommonModule, UserFormComponent ],
  templateUrl: './user-form-update.component.html',
  styleUrl: './user-form-update.component.scss'
})
export class UserFormUpdateComponent {

  @Input() userToUpdate: PersonModel;
  @Input() isStudents: Boolean;

  @Output() cancel = new EventEmitter<void>();
  @Output() userUpdated = new EventEmitter<PersonModel>();

  public onCancel(): void {
    this.cancel.emit();
  }

  public onUserUpdated(userUpdated: PersonModel): void {
    this.userUpdated.emit(userUpdated);
  }
}
