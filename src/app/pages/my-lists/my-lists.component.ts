import { Component } from '@angular/core';
import { SupabaseService } from '../../shared/services/supa/supa.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-my-lists',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule
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

}
