import { Component, inject, ViewChild, signal } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { StoreModel } from '../../shared/models/store.model';
import { ListDataDefaultService } from '../../shared/services/list-data-default/list-data-default.service';
import { Observable } from 'rxjs';
import { FormsModule, FormControl, ReactiveFormsModule, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ShoppingListItemModel } from '../../shared/models/shopping-list-item.model';
import { SupabaseService } from '../../shared/services/supa/supa.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';

@Component({
  selector: 'app-create-list',
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
  templateUrl: './create-list.component.html',
  styleUrl: './create-list.component.scss'
})
export class CreateListComponent {
  public storeGUID: string | undefined;
  public selectedStore: StoreModel | undefined;
  public selectedStoreAddress: string | undefined;
  public listDataDefaultService: ListDataDefaultService = inject(ListDataDefaultService);

  @ViewChild('formElement') formElement!: NgForm;

  //State management
  isEditing = signal(false);
  itemToUpdateIndex: number | null = null;

  shoppingForm: FormGroup;

  storeItemsControl = new FormControl('');
  filteredOptions!: Observable<StoreModel[]>;
  selectedItems: any[] = []; // Array to store selected items
  storeItems: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private supaService: SupabaseService,
    private dialog: MatDialog
  ) {
    this.route.params.subscribe((params: Params) => {
      this.storeGUID = params['guid'];
      this.selectedStore = this.listDataDefaultService.getSpecificStore(this.storeGUID);
    });

    this.selectedStoreAddress = `${this.selectedStore?.storeLocationStreet} ${this.selectedStore?.storeLocationTown}, ${this.selectedStore?.storeLocationState}`;

    this.shoppingForm = this.formBuilder.group({
      item: '',
      quantity: '',
      notes: '',
      isCompleted: false
    })
  }

  async ngOnInit(){
    this.storeItems = await this.supaService.getStoreItems('safeway_pullman');
    console.log(this.storeItems);

  }

  onSubmit() {
    const isAlreadyAdded = this.selectedItems.some((i) => i.item.item_name === this.shoppingForm.value.item.name);
    if (!isAlreadyAdded) {
      this.selectedItems.push(this.shoppingForm.value);
      this.formElement.resetForm();
      this.shoppingForm.reset({
        item: '',
        quantity: '',
        notes: '',
        isCompleted: false
      });
    } else {
      alert("This item appears to be in your list already");
    }
  }

  deleteItem(item:ShoppingListItemModel): void{
    const itemIndex = this.selectedItems.indexOf(item);
    this.selectedItems.splice(itemIndex, 1);
  }

  setFormUpdateItem(updateItem: ShoppingListItemModel, updateItemIndex: number): void {
    //Reset form and update state
    this.shoppingForm.reset();
    this.isEditing.set(true);

    // Look for the StoreItemModel matching the saved name
    const matchingStoreItem = this.storeItems.find(
      storeItem => storeItem.item_name === updateItem.item.item_name
    );

    if (!matchingStoreItem) {
      console.warn('No matching store item found for:', updateItem.item.item_name);
      return;
    }

    this.shoppingForm.setValue({
      item: matchingStoreItem,
      quantity: updateItem.quantity,
      notes: updateItem.notes,
      isCompleted: false
    });

    this.itemToUpdateIndex = updateItemIndex;
  }

  updateItem(){
    if (this.itemToUpdateIndex === null) {
      console.warn('No item is currently being edited');
      return;
    }

    const updatedItem: ShoppingListItemModel = {
      item: this.shoppingForm.value.item,
      quantity: this.shoppingForm.value.quantity,
      notes: this.shoppingForm.value.notes,
      isCompleted: false
    };

    // Update the item at the stored index
    this.selectedItems[this.itemToUpdateIndex] = updatedItem;

    // Reset editing state
    this.isEditing.set(false);
    this.itemToUpdateIndex = null;
    this.shoppingForm.reset({
      item: '',
      quantity: '',
      notes: '',
      isCompleted: false
    });
  }

  cancelUpdate(){
    this.shoppingForm.reset({
      item: '',
      quantity: '',
      notes: '',
      isCompleted: false
    });
    this.isEditing.set(false)
  }

  finalizeList(){
    this.dialog.open(DialogComponent, {
        width: '450px',
        backdropClass: 'backdrop'
      }).afterClosed().subscribe(author => {
        if (author) {
          this.submitList(author);
        } else {
          console.error("Issue getting author");
        }
      });
  }


  submitList(author: string){
    this.supaService.submitList(this.selectedStore?.storeName, this.selectedStoreAddress, this.selectedStore?.storeLogo, this.selectedItems, author);
  }

  //Used to display selected items in list
  // displaySelectedItem(item: StoreItemModel): string {
  //   return item ? `${item.name} (${item.aisle})` : '';
  // }
  displaySelectedItem(item: any): string {
    return item ? `${item.item_name} (${item.item_aisle})` : '';
  }

}
