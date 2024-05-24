import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import de AbstractControl ajouté pour le validateur de mot de passe
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MenuRoutes } from '../../constants/routes';

export function passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { 'passwordMismatch' : true };
  }

  return null;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Champ email avec validation
      password: ['', [Validators.required, Validators.minLength(6)]], // Champ mot de passe avec validation
      confirmPassword: ['', [Validators.required]] // Champ confirmation de mot de passe avec validation de correspondance
    }, { validators: passwordMatchValidator });
  }

  // Méthode d'inscription (à implémenter selon la logique de ton application)
  public register(): void {
    if (this.registerForm.valid) {
      console.log('Formulaire valide', this.registerForm.value);
    } else {
      console.log('Formulaire invalide');
    }
  }

  public navToLogin(): void {
    this.router.navigate([MenuRoutes.LOGIN]);
  }
}
