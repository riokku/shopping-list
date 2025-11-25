import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { SupabaseService } from '../../shared/services/supa/supa.service';
import { CommonModule } from '@angular/common';
import { AddInventoryDialogComponent } from '../../shared/components/add-inventory-dialog/add-inventory-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ListDataDefaultService } from '../../shared/services/list-data-default/list-data-default.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIcon,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {

  storeItems: any[] = [];
  storeItemsResults: any[] = [];
  aisleOptions: any[] = [];
  private storeName = "safeway_pullman";
  adminForm: FormGroup;
  updateItemID: number | undefined;
  @ViewChild('formElement') formElement!: NgForm;

  searchInput: string = '';

  //State management
  isEditing = signal(false);
  itemToUpdateIndex: number = -1;

  constructor(
    private formBuilder: FormBuilder,
    private supaService: SupabaseService,
    private dialog: MatDialog,
    private listDataDefaultService: ListDataDefaultService
  ){
    this.adminForm = this.formBuilder.group({
      name: '',
      aisle: ''
    })
    this.aisleOptions = this.listDataDefaultService.getAisles();
  }

  async ngOnInit() {
    this.storeItems = (await this.supaService.getItems(this.storeName)).sort((a, b) => a.item_name.localeCompare(b.item_name));
    this.storeItemsResults = this.storeItems;
  }

  async onSubmit() {
    const isAlreadyAdded = this.storeItems.some((i) => i.item_name === this.adminForm.value.name);
    if (!isAlreadyAdded) {
      this.supaService.addItem(this.adminForm.value);
      console.log(this.adminForm.value);

      this.formElement.resetForm();
      this.storeItems = (await this.supaService.getItems(this.storeName)).sort((a, b) => a.item_name.localeCompare(b.item_name));
    } else {
      alert("This item appears to be in your list already");
    }
  }

  async deleteItem(item: any, deleteItemIndex: number){
    console.log(item);
    this.supaService.deleteItem(item);
    this.storeItems.splice(deleteItemIndex, 1);
  }

  setFormUpdateItem(updateItem: any, updateItemIndex: number): void {
    //Reset form and update state
    this.formElement.resetForm();
    this.isEditing.set(true);

    //Set form to updated item values
    this.adminForm.setValue({
      name: updateItem.item_name,
      aisle: updateItem.item_aisle
    });

    this.updateItemID = updateItem.id;

    this.itemToUpdateIndex = updateItemIndex;
  }

  async updateItem(){
    const updatedItem: any = this.adminForm.value;
    this.supaService.updateItemn(updatedItem, this.updateItemID);

    this.storeItems[this.itemToUpdateIndex].item_name = updatedItem.name;
    this.storeItems[this.itemToUpdateIndex].item_aisle = updatedItem.aisle;

    // Reset editing state
    this.isEditing.set(false);
    this.itemToUpdateIndex = -1;
    this.formElement.resetForm();

  }

  cancelUpdate(){
    this.formElement.resetForm();
    this.isEditing.set(false)
  }

  updateResults(){
    this.storeItemsResults = this.storeItems.filter(item => item.item_name.toLowerCase().includes(this.searchInput.toLowerCase()));
  }

}
