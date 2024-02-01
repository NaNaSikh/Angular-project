import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-product',

  templateUrl: './addProduct.component.html',
  styleUrls: ['./addProduct.component.css']
})

export class AddProductComponent implements OnInit {
  public addProductForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.addProductForm = this.formBuilder.group({
      category: ['', [Validators.required]],
      status: ['', [Validators.required]],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      // image: ['', [Validators.required]]

    });
  }




  addProduct() {
    const userID = localStorage.getItem('userId');
    const imageUrl = "https://picsum.photos/720/400?image=1";
    if (!userID) {
      console.error('User ID is missing.');
      return;
    }

    let productOwner = "";
    this.http.get<any>('http://localhost:3000/registeredUsers').subscribe(
      (users) => {
        let foundUser = users.find((user) => user.id == userID);
        if (foundUser) {
          productOwner = foundUser.userName;
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


    if (this.addProductForm.valid) {
      const requestData = { ...this.addProductForm.value, userID, imageUrl, productOwner };
      this.http.post<any>('http://localhost:3000/products', requestData).subscribe(
        (res) => {
          console.log('success');
          this.addProductForm.reset();
          this.router.navigate(['profile']);
        },
        (err) => {
          console.log('something went wrong ', err);
        }
      );
    } else {
      alert("Some fields are not valid");
    }
  }

}

