import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {


  name: string = "";
  email: string = "";
  username: string = "";
  userID = localStorage.getItem('userId');
  // selectedLanguage: string = 'en';

  // setLanguage(lang: string): void {
  //   this.selectedLanguage = lang;
  //   this.translate.use('ka');
  // }

  constructor(private http: HttpClient, private router: Router, private translate: TranslateService) {
    translate.setDefaultLang('en');

  }

  ngOnInit(): void {

    this.http.get<any>('http://localhost:3000/registeredUsers').subscribe(
      (users) => {
        let foundUser = users.find((user) => user.id == this.userID);
        if (foundUser) {
          this.name += foundUser.name;
          this.name += ' ' + foundUser.lastName;
          this.username = foundUser.userName;
          this.email = foundUser.email;
        } else {
          alert('something went wrong ');
          this.router.navigate(['auth/login']);
        }
      },
      (error) => {
        console.error('Error reading users.json:', error);
        alert('Something went wrong');
      }
    );
  }

}
