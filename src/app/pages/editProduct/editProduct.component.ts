import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsData } from 'src/app/types/cardsData.types';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-product',

  templateUrl: './editProduct.component.html',
  styleUrls: ['./editProduct.component.css']
})
export class EditProductComponent implements OnInit {
  productId!: string;
  product$!: Observable<CardsData | undefined>;
  title!: string;
  category!: string;
  status!: string;
  description!: string;
  salary!: number;
  userID!: string;
  public editForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private http: HttpClient, private router: Router, private translate: TranslateService) {
    translate.setDefaultLang('en');

  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['id'].toString();
      this.product$ = this.getProductDetails(this.productId);
    });

    this.editForm = this.formBuilder.group({
      title: [''],
      category: [''],
      status: [''],
      description: [''],
      salary: [''],
    });

    this.userID = localStorage.getItem("userId");
  }

  getProductDetails(productId: CardsData['id']): Observable<CardsData | undefined> {
    return this.http.get<CardsData[]>('http://localhost:3000/products').pipe(
      map((products) => {
        let item = products.find((product) => product.id == productId);
        this.title = item.title;
        this.category = item.category;
        this.status = item.status;
        this.description = item.description;
        this.salary = item.salary;
        return item;


      }),
      catchError((error) => {
        console.error('Error reading products:', error);
        return [];
      })
    );
  }

  editProduct() {
    const imageUrl = "https://picsum.photos/720/400?image=1";
    if (this.editForm.valid) {
      const updatedProduct: any = {};
      updatedProduct['userID'] = this.userID;
      updatedProduct['imageUrl'] = imageUrl;
      Object.keys(this.editForm.controls).forEach((key) => {
        const control = this.editForm.get(key);
        console.log("control value:" + control.value)
        console.log("key is:" + key)
        if (control?.dirty) {
          updatedProduct[key] = control.value;
        } else {
          switch (key) {
            case 'title':
              updatedProduct[key] = this.title;
              break;
            case 'category':
              updatedProduct[key] = this.category;
              break;
            case 'status':
              updatedProduct[key] = this.status;
              break;
            case 'description':
              updatedProduct[key] = this.description;
              break;
            case 'salary':
              updatedProduct[key] = this.salary;
              break;
            default:
              break;
          }

        }
      });

      let apiUrl = 'http://localhost:3000/products/';
      apiUrl += this.productId;
      this.http.put<any>(apiUrl, updatedProduct).subscribe(
        (response) => {
          console.log('Product updated successfully:', response);
          alert("product updeted");
          this.router.navigate(['profile']);
        },
        (error) => {
          alert("error");
          console.error('Error updating product:', error);
        }
      );
    }
  }


}

