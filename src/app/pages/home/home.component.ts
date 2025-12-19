import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ListDataDefaultService } from '../../shared/services/list-data-default/list-data-default.service';
import { CommonModule} from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { StoreModel } from '../../shared/models/store.model';
import { Session } from '@supabase/supabase-js';
import { Router } from '@angular/router';
import { SupabaseService } from '../../shared/services/supa/supa.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatButtonModule,
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
  activeSession: Session | null = null;

  constructor(
    private router: Router,
    private supaService: SupabaseService,
  ){
    this.storeList = this.listDataDefaultService.getStores()
  }

  ngOnInit() {
    this.filteredOptions = this.storeControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterStores(value || '')),
    );

    this.supaService.session$.subscribe(session => this.activeSession = session);
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
