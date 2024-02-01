import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CardsData } from 'src/app/types/cardsData.types';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-my-products',
  templateUrl: './myProducts.component.html',
  styleUrls: ['./myProducts.component.css']
})
export class MyProductsComponent {

  param = { value: 'world' };
  stat: string = ""
  itemID: string = ""
  userID = localStorage.getItem('userId');
  cardsData: CardsData[] = [];


  constructor(private http: HttpClient, private router: Router, private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {

    this.loadCardsData();

  }


  loadCardsData() {
    this.http.get<any>('http://localhost:3000/products').subscribe(
      (data) => {
        const userID = localStorage.getItem('userId');
        let foundItem = data.filter((item) => item.userID === userID);
        this.cardsData = foundItem;
        this.itemID = foundItem.id;
        foundItem.forEach((item) => {
          this.stat = foundItem.status;
          this.getItemBackgroundColor(this.stat);
        });
      },
      (error) => {
        console.error('Error loading JSON data:', error);
      }
    );
  }
  getItemBackgroundColor(status: string): string {
    return status == 'Active' ? '#3cb371' : '#dc143c';
  }
  editProduct() {
    // this.router.navigate(['editProduct/' +this.itemID])
    console.log("edit");
  }

  showConfirmation: boolean = false;
  productIdToDelete: string = '';

  closeConfirmation(): void {
    this.showConfirmation = false;
    this.productIdToDelete = '';
  }
  openDeleteConfirmation(productId: string): void {
    this.showConfirmation = true;
    this.productIdToDelete = productId
  }

  deleteProduct(): void {

    this.http
      .delete(`http://localhost:3000/products/${this.productIdToDelete}`)
      .subscribe(
        () => {
          console.log(`Product with ID ${this.productIdToDelete} deleted successfully.`);
          window.location.reload();
        },
        (error) => {
          console.error(`Error deleting product with ID ${this.productIdToDelete}:`, error);
        }
      );

    console.log('Deleting product with ID:', this.productIdToDelete);
    this.closeConfirmation();

  }
}
