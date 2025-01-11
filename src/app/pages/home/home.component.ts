import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ListDataDefaultService } from '../../shared/services/list-data-default/list-data-default.service';
import { AsyncPipe, CommonModule} from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatIcon } from '@angular/material/icon';
import { StoreModel } from '../../shared/models/store.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatIcon,
    MatButtonModule,
    AsyncPipe,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  storeList: StoreModel[] = [];
  listDataDefaultService: ListDataDefaultService = inject(ListDataDefaultService);

  myControl = new FormControl('');
  filteredOptions!: Observable<StoreModel[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(storeName: string): StoreModel[] {
    const filterValue = storeName.toLowerCase();
    return this.storeList.filter(store => store.storeName.toLowerCase().includes(filterValue));
  }

  console_stuff(info:any){
    console.log(info);
  }

  displaySelectedStore(store: StoreModel): string {
    return store ? `${store.storeName} (${store.storeLocationStreet}, ${store.storeLocationTown}, ${store.storeLocationState})` : '';
  }

  constructor(){
    this.storeList = this.listDataDefaultService.getItems();
  }

}
