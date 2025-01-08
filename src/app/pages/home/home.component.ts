import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ListDataDefaultService } from '../../shared/services/list-data-default/list-data-default.service';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Observable, of} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatIcon } from '@angular/material/icon';


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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  testItemsList: string[] = [];
  listDataDefaultService: ListDataDefaultService = inject(ListDataDefaultService);

  myControl = new FormControl('');
  filteredOptions!: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.testItemsList.filter(option => option.toLowerCase().includes(filterValue));
  }

  constructor(){
    this.testItemsList = this.listDataDefaultService.getItems();
  }

}
