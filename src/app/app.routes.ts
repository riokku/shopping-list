import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MyListsComponent } from './pages/my-lists/my-lists.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home'
  },
  {
    path: 'my-lists',
    component: MyListsComponent,
    title: 'My Lists'
  }
];
