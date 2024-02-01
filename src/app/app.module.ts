// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StorageModule } from '@ngx-pwa/local-storage';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { RouterLink } from '@angular/router';
import { AuthLayoutComponent } from './components/layouts/authLayout/authLayout.component';
import { HomeComponent } from './pages/home/home.component';

// Auth Pages
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { DefaultLayoutComponent } from './components/layouts/defaultLayout/defaultLayout.component';
import { ProductDetailsComponent } from './pages/productDetails/productDetails.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AddProductComponent } from './pages/addProduct/addProduct.component';
import { EditProductComponent } from './pages/editProduct/editProduct.component'
import { MyProductsComponent } from './pages/myProducts/myProducts.component';
import { CardComponent } from './components/card/card.component';
import { HeaderComponent } from './components/common/header.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, AuthLayoutComponent, RegisterComponent, LoginComponent, DefaultLayoutComponent,
    ProductDetailsComponent,
    ProfileComponent,
    AddProductComponent, EditProductComponent,
    MyProductsComponent, HomeComponent, CardComponent, HeaderComponent

  ],
  imports: [

    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    StorageModule,
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [TranslateService],
  bootstrap: [AppComponent],

})
export class AppModule { }
