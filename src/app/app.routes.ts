import { Routes } from '@angular/router';


import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { DefaultLayoutComponent } from './components/layouts/defaultLayout/defaultLayout.component';
import { AuthLayoutComponent } from './components/layouts/authLayout/authLayout.component';
import { ProductDetailsComponent } from './pages/productDetails/productDetails.component';
import { AddProductComponent } from './pages/addProduct/addProduct.component';
import { EditProductComponent } from './pages/editProduct/editProduct.component'
import { MyProductsComponent } from './pages/myProducts/myProducts.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'product-details/:id',
        component: ProductDetailsComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'addProduct',
        component: AddProductComponent,
      },
      {
        path: 'editProduct/:id',
        component: EditProductComponent,
      },
      {
        path: 'myProducts',
        component: MyProductsComponent,
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
];
