import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MyListsComponent } from './pages/my-lists/my-lists.component';
import { CreateListComponent } from './pages/create-list/create-list.component';
import { LoginComponent } from './pages/login/login.component';
import { ViewListComponent } from './pages/view-list/view-list.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminGuard } from './shared/guards/admin/admin.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home | Cartographer'
  },
  {
    path: 'create-list',
    component: CreateListComponent,
    title: 'Cartographer | Create a list'
  },
  {
    path: 'my-lists',
    component: MyListsComponent,
    title: 'Cartographer | My Lists'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Cartographer | Authenticate'
  },
  {
    path: 'list/:guid',
    component: ViewListComponent,
    title: 'Cartographer | Time to shop!'
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
    title: 'Admin Dashboard'
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
