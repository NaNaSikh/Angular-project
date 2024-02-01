import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',

  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5)]],
    }, { validator: this.passwordMatchValidator });

  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }

    return null;
  }

  register() {
    if (this.registerForm.valid) {
      if (this.registerForm.get('password')?.value === this.registerForm.get('confirmPassword')?.value) {
        console.log('Passwords match:', this.registerForm.value);
        const requestData = { ...this.registerForm.value };
        delete requestData.confirmPassword;
        this.http.post<any>('http://localhost:3000/registeredUsers', requestData).subscribe(
          (res) => {
            console.log('success');
            this.registerForm.reset();
            this.router.navigate(['auth/login']);
          },
          (err) => {
            console.log('something went wrong ', err);
          }
        );
      } else {
        console.log('Passwords do not match');
        alert('Passwords do not match');
      }
    } else {
      alert("Some fields are not valid");
    }
  }

}
