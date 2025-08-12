import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { StoreItemModel } from '../../shared/models/store-item.model';
import { SupabaseService } from '../../shared/services/supa/supa.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    MatIcon,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {

  constructor(
    private supaService: SupabaseService
  ){}

  storeItems: any[] = [];
  private storeName = "safeway_pullman"
  async ngOnInit() {
    this.storeItems = await this.supaService.getItems(this.storeName);
    console.log("Store items", this.storeItems);

  }

  addItem(){
    console.log('add');
  }

  editItem(){
    console.log('update');
  }

  deleteItem(){
    console.log('delete');
  }

}
