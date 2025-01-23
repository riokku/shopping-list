import { Component, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { StoreModel } from '../../shared/models/store.model';
import { ListDataDefaultService } from '../../shared/services/list-data-default/list-data-default.service';
import { StoreItemModel } from '../../shared/models/store-item.model';
import { Observable } from 'rxjs';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-list',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
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

  storeItemsControl = new FormControl('');
  filteredOptions!: Observable<StoreModel[]>;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => {
      this.storeGUID = params['guid'];
      this.selectedStore = this.listDataDefaultService.getSpecificStore(this.storeGUID);
    });
  }

  displaySelectedItem(item: StoreItemModel): string {
    return item ? `${item.name} (${item.aisle})` : '';
  }

}
