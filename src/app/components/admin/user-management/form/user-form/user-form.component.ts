import { SnackBarService } from './../../../../../service/shared/snack-bar.service';
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
  @Input() userToUpdate: PersonModel;
  @Input() isStudents: Boolean;

  @Output() cancel = new EventEmitter<void>();
  @Output() userCreated = new EventEmitter<PersonModel>();
  @Output() userUpdated = new EventEmitter<PersonModel>();

  public userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBarService: SnackBarService
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
      email: this.userToUpdate.email,
      firstName: this.userToUpdate.firstName,
      lastName: this.userToUpdate.lastName,
    })
  }

  // Méthode d'inscription (à implémenter selon la logique de ton application)
  public save(): void {
    if (this.userForm.valid) {
      if (this.isEdition) {
        this.isStudents ? this.editionStudent() : this.editionInstructor();
      }
      else {
        this.isStudents ? this.creationStudent() : this.creationInstructor();
      }
    }
  }

  private async creationStudent(): Promise<void> {
    try {
      const userCreated: PersonModel = await this.userService.
        creatStudent(
          this.userForm.get('email')?.value,
          this.userForm.get('firstName')?.value,
          this.userForm.get('lastName')?.value,
          this.userForm.get('password')?.value,
        );

      this.snackBarService.openSnackBar("L'étudiant à bien été créé !", "OK");

      this.userCreated.emit(userCreated);
    }
    catch (error) {
      this.snackBarService.openSnackBar("L'étudiant n'a pas pu être créé !", "OK", null);
    }
  }

  private async editionStudent(): Promise<void> {
    try {
      const userUpdated: PersonModel = await this.userService.
        updateStudent(
          this.userToUpdate.personId,
          this.userForm.get('email')?.value,
          this.userForm.get('firstName')?.value,
          this.userForm.get('lastName')?.value,
          this.userForm.get('password')?.value,
        );

      this.snackBarService.openSnackBar("L'étudiant a bien été modifié !", "OK");

      this.userUpdated.emit(userUpdated);
    }
    catch (error) {
      this.snackBarService.openSnackBar("L'étudiant n'a pas pu être modifié !", "OK", null);
    }
  }

  private async creationInstructor(): Promise<void> {
    try {
      const userCreated: PersonModel = await this.userService.
        creatInstructor(
          this.userForm.get('email')?.value,
          this.userForm.get('firstName')?.value,
          this.userForm.get('lastName')?.value,
          this.userForm.get('password')?.value,
        );

      this.userCreated.emit(userCreated);

      this.snackBarService.openSnackBar("L'instructeur à bien été créé !", "OK");
    }
    catch (error) {
      this.snackBarService.openSnackBar("L'instructeur n'a pas pu être créé !", "OK", null);
    }
  }

  private async editionInstructor(): Promise<void> {
    try {
      const userUpdated: PersonModel = await this.userService.
        updateInstructor(
          this.userToUpdate.personId,
          this.userForm.get('email')?.value,
          this.userForm.get('firstName')?.value,
          this.userForm.get('lastName')?.value,
          this.userForm.get('password')?.value,
        );

      this.snackBarService.openSnackBar("L'instructeur a bien été modifié !", "OK");

      this.userUpdated.emit(userUpdated);
    }
    catch (error) {
      this.snackBarService.openSnackBar("L'instructeur n'a pas pu être modifié !", "OK", null);
    }
  }

  public onCancel(): void {
    this.cancel.emit();
  }
}
