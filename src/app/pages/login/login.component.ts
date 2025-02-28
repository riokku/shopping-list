import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../shared/services/supa/supa.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  signUpForm: FormGroup;
  public loggedIn: boolean = false;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private supaService: SupabaseService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  switchMode(){
    this.loggedIn = !this.loggedIn;
  }

  async signUp() {
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;

    this.supaService.signUp(email, password).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);

    })
  }

  async login() {
    if (this.loginForm.invalid) return;
    const { email, password } = this.loginForm.value;

    // const { error } = await this.supaService.signIn(email, password);

    // if (error) {
    //   this.snackBar.open(error.message, 'Close', { duration: 3000 });
    // } else {
    //   this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
    // }
  }
}

