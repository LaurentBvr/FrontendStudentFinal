import { UserService } from './../../../../../service/api/user.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PersonModel } from '../../../../../models/person.model';

export function passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { 'passwordMismatch' : true };
  }

  return null;
}

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {

  @Input() isEdition: boolean;
  @Input() studentToUpdate: PersonModel;

  @Output() cancel = new EventEmitter<void>();
  @Output() studentCreated = new EventEmitter<PersonModel>();
  @Output() studentUpdated = new EventEmitter<PersonModel>();

  public userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.createForm();

    if (this.isEdition) {
      this.initForm();
    }
  }

  private createForm(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Champ email avec validation
      firstName:  ['', [Validators.required]],
      lastName:  ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]], // Champ mot de passe avec validation
      confirmPassword: ['', [Validators.required]] // Champ confirmation de mot de passe avec validation de correspondance
    }, { validators: passwordMatchValidator });
  }

  private initForm(): void {
    this.userForm.patchValue({
      email: this.studentToUpdate.email,
      firstName: this.studentToUpdate.firstName,
      lastName: this.studentToUpdate.lastName,
    })
  }

  // Méthode d'inscription (à implémenter selon la logique de ton application)
  public save(): void {
    if (this.userForm.valid) {
      if (this.isEdition) {
        this.edition();
      }
      else {
        this.creation();
      }
    }
  }

  private async creation(): Promise<void> {
    try {
      const studentCreated: PersonModel = await this.userService.
        creatStudent(
          this.userForm.get('email')?.value,
          this.userForm.get('firstName')?.value,
          this.userForm.get('lastName')?.value,
          this.userForm.get('password')?.value,
        );

      this.studentCreated.emit(studentCreated);
    }
    catch (error) {
      console.log(error);
    }
  }

  private async edition(): Promise<void> {
    try {
      const studentUpdated: PersonModel = await this.userService.
        updateStudent(
          this.studentToUpdate.personId,
          this.userForm.get('email')?.value,
          this.userForm.get('firstName')?.value,
          this.userForm.get('lastName')?.value,
          this.userForm.get('password')?.value,
        );

      this.studentUpdated.emit(studentUpdated);
    }
    catch (error) {
      console.log(error);
    }
  }

  public onCancel(): void {
    this.cancel.emit();
  }

}
