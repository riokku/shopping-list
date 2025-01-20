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
import { Router } from '@angular/router';

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

  storeControl = new FormControl('');
  filteredOptions!: Observable<StoreModel[]>;

  constructor(
    private router: Router
  ){
    this.storeList = this.listDataDefaultService.getStores()
  }

  ngOnInit() {
    this.filteredOptions = this.storeControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterStores(value || '')),
    );
  }

  private filterStores(incomingStoreName: string): StoreModel[] {
    const filterValue = incomingStoreName.toString().toLowerCase();
    return this.storeList.filter(store => store.storeName.toLowerCase().includes(filterValue));
  }

  generateList(incomginStore: any){
    this.router.navigate([`create-list/${incomginStore.storeGUID}`])
  }

  displaySelectedStore(store: StoreModel): string {
    return store ? `${store.storeName} (${store.storeLocationStreet}, ${store.storeLocationTown}, ${store.storeLocationState})` : '';
  }



}
