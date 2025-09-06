import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Categories } from './pages/categories/categories';
import { Materials } from './pages/materials/materials';
import { Projects } from './pages/projects/projects';
import { AddProducts } from './components/add-products/add-products';
import { UpdateProduct } from './components/update-product/update-product';
import { Tags } from './pages/tags/tags';
import { Login } from './components/login/login';
import { UpdateTag } from './components/update-tag/update-tag';
import { UpdateCategory } from './components/update-category/update-category';
import { UpdateMaterial } from './components/update-material/update-material';
import { Products } from './components/products/products';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  {
    path: 'dashboard/:id',
    component: Dashboard,
    children: [
      {
        path: 'categories', children: [
          { path: '', component: Categories },
          { path: 'update/:id', component: UpdateCategory }
        ]
      },
      {
        path: 'tags', children: [
          { path: '', component: Tags },
          { path: 'update/:id', component: UpdateTag }
        ]
      },
      {
        path: 'materials', children: [
          { path: '', component: Materials },
          { path: 'update/:id', component: UpdateMaterial }
        ]
      },
      { path: 'projects', component: Projects },
      {
        path: 'products', children: [
          { path: '', component: Products },
          { path: 'create', component: AddProducts },
          { path: 'update', component: UpdateProduct }
        ]
      }
    ]
  }
];