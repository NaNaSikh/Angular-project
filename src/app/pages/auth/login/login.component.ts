import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  signUpForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

    // localStorage.setItem('userId', null);
  }


  signUp() {
    console.log(this.signUpForm.value.email)
    let enteredEmail = this.signUpForm.value.email;
    let enteredPassword = this.signUpForm.value.password;

    this.http.get<any>('http://localhost:3000/registeredUsers').subscribe((users) => {
      // Find the user by name
      let foundUser = users.find((user) => user.email === enteredEmail);
      console.log(foundUser.password)
      if (foundUser && foundUser.password == enteredPassword) {
        let userID = foundUser.id;
        localStorage.setItem('userId', userID);
        this.router.navigate(['profile']);

      } else {
        alert('Invalid username or password');
      }
    }, (error) => {
      console.error('Error reading users.json:', error);
      alert('Something went wrong');
    });
  }
}
