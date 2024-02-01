import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CardsData } from 'src/app/types/cardsData.types';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product-details',

  templateUrl: './productDetails.component.html',
  styleUrls: ['./productDetails.component.css']
})

export class ProductDetailsComponent implements OnInit {
  productId!: string;
  product$!: Observable<CardsData | undefined>;

  constructor(private route: ActivatedRoute, private http: HttpClient, private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      this.product$ = this.getProductDetails(this.productId);
    });
  }

  getProductDetails(
    productId: CardsData['id']
  ): Observable<CardsData | undefined> {
    return this.http.get<CardsData[]>('http://localhost:3000/products').pipe(
      map((products) => {
        let item = products.find((product) => product.id == productId);
        return item;
      }),
      catchError((error) => {
        console.error('Error reading products:', error);
        return [];
      })
    );
  }
}

