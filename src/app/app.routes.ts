import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MyListsComponent } from './pages/my-lists/my-lists.component';
import { CreateListComponent } from './pages/create-list/create-list.component';

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
  }
];
