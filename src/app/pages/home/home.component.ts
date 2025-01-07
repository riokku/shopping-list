import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ListDataDefaultService } from '../../shared/services/list-data-default/list-data-default.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatButtonModule, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  testItemsList: string[] = [];
  listDataDefaultService: ListDataDefaultService = inject(ListDataDefaultService);

  constructor(){
    this.testItemsList = this.listDataDefaultService.getItems();
  }

}
