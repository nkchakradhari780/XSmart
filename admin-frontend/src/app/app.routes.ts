import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Categories } from './pages/categories/categories';
import { Materials } from './pages/materials/materials';
import { Projects } from './pages/projects/projects';
import { Products } from './pages/products/products';
import { AddProducts } from './components/add-products/add-products';
import { UpdateProduct } from './components/update-product/update-product';
import { Tags } from './pages/tags/tags';
import { Login } from './components/login/login';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: Login },
  {
    path: 'dashboard',
    component: Dashboard,
    children: [
      { path: 'categories', component: Categories },
      { path: 'tags', component: Tags },
      { path: 'materials', component: Materials },
      { path: 'projects', component: Projects },
      { path: 'products', component: Products, children: [
        {path: 'add', component: AddProducts},
        {path: 'update', component: UpdateProduct}
      ] }
    ]
  }
];