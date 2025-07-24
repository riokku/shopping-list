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
import { Session } from '@supabase/supabase-js';
import { Router } from '@angular/router';

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
  private errorMessage: string = '';
  activeSession: Session | null = null;

  constructor(
    private fb: FormBuilder,
    private supaService: SupabaseService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.supaService.session$.subscribe(session => this.activeSession = session);
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
    this.errorMessage = '';
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    try {
      const result = await this.supaService.signIn(email, password);
      console.log('Login successful:', result);
      this.router.navigate(['/']);
      this.snackBar.open('Log in successful! Let\'s shop', 'Dismiss', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
    } catch (error: any) {
      console.error('Login error:', error);
      this.errorMessage = error.message || 'Login failed';
      this.snackBar.open('Failed login! Please try again.', 'Dismiss', {
        duration: 3000,
        panelClass: ['failed-snackbar']
      });
    }


  }

  async logout() {
    await this.supaService.signOut();
    this.router.navigate(['/login']);
  }
}

