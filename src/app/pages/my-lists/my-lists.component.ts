import { Component } from '@angular/core';
import { SupabaseService } from '../../shared/services/supa/supa.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-my-lists',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIcon
  ],
  templateUrl: './my-lists.component.html',
  styleUrl: './my-lists.component.scss'
})
export class MyListsComponent {

  shoppingLists: any[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private supaService: SupabaseService){}

  async ngOnInit() {
    try {
      this.shoppingLists = await this.supaService.getUserShoppingLists();
    } catch (err: any) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  }

   normalizeDate(date: string) {
    return date.replace(/(\.\d{3})\d+/, '$1');
  }

}
