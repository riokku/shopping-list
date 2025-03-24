import { Component, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { StoreModel } from '../../shared/models/store.model';
import { ListDataDefaultService } from '../../shared/services/list-data-default/list-data-default.service';
import { StoreItemModel } from '../../shared/models/store-item.model';
import { Observable } from 'rxjs';
import { FormsModule, FormControl, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ShoppingListItemModel } from '../../shared/models/shopping-list-item.model';

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
  public selectedStoreItems: StoreItemModel[] | undefined;
  public listDataDefaultService: ListDataDefaultService = inject(ListDataDefaultService);

  public showAddItemForm: boolean = false;

  shoppingForm: FormGroup;

  storeItemsControl = new FormControl('');
  filteredOptions!: Observable<StoreModel[]>;
  selectedItems: any[] = []; // Array to store selected items

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.route.params.subscribe((params: Params) => {
      this.storeGUID = params['guid'];
      this.selectedStore = this.listDataDefaultService.getSpecificStore(this.storeGUID);
    });

    this.shoppingForm = this.formBuilder.group({
      item: '',
      quantity: '',
      notes: ''
    })
  }

  addItem(item: ShoppingListItemModel): void {
    // Check if the item is already added
    const isAlreadyAdded = this.selectedItems.some((i) => i.name === item.name);
    if (!isAlreadyAdded) {
      this.selectedItems.push(item);
    }
  }

  onSubmit(){
    const isAlreadyAdded = this.selectedItems.some((i) => i.item.name === this.shoppingForm.value.item.name);
    if (!isAlreadyAdded) {
      this.selectedItems.push(this.shoppingForm.value);
      this.shoppingForm.reset();
    }
    console.log(this.shoppingForm.value.name);

  }

  displaySelectedItem(item: StoreItemModel): string {
    return item ? `${item.name} (${item.aisle})` : '';
  }

}
