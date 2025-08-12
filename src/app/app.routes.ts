import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MyListsComponent } from './pages/my-lists/my-lists.component';
import { CreateListComponent } from './pages/create-list/create-list.component';
import { StoreManagementComponent } from './pages/store-management/store-management.component';
import { LoginComponent } from './pages/login/login.component';
import { ViewListComponent } from './pages/view-list/view-list.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminGuard } from './shared/guards/admin/admin.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home'
  },
  {
    path: 'create-list/:guid',
    component: CreateListComponent,
    title: 'Create your list'
  },
  {
    path: 'my-lists',
    component: MyListsComponent,
    title: 'My Lists'
  },
  {
    path: 'store-management',
    component: StoreManagementComponent,
    title: 'Manage Store'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Authenticate'
  },
  {
    path: 'list/:guid',
    component: ViewListComponent,
    title: 'Time to shop!'
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
