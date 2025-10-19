import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingListItemModel } from '../../shared/models/shopping-list-item.model';
import { SupabaseService } from '../../shared/services/supa/supa.service';
import { CommonModule } from '@angular/common';
import { ListDataDefaultService } from '../../shared/services/list-data-default/list-data-default.service';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-view-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    MatButtonModule
  ],
  templateUrl: './view-list.component.html',
  styleUrl: './view-list.component.scss'
})
export class ViewListComponent {

  public listGUID: string | undefined;
  public listDetails: any;
  public listItems: any;
  public groupedItems: Record<string, ShoppingListItemModel[]> = {};
  public aisleOrder: string[] = [];

  constructor(
      private route: ActivatedRoute,
      private supaService: SupabaseService,
      private listDataDefaultService: ListDataDefaultService,
      private router: Router
    ) {
      this.route.params.subscribe((params: Params) => {
        this.listGUID = params['guid'];
      });
    }
  async ngOnInit() {
    this.listDetails = await this.supaService.getSpecificList(this.listGUID);
    this.listItems = this.listDetails.items;
    this.aisleOrder = await this.listDataDefaultService.getStoreAisleOrder(this.listDetails.store_name);
    this.groupedItems = this.groupItemsByAisle(this.listItems);
  }

  groupItemsByAisle(items: any[]): Record<string, any[]> {
    const groups: Record<string, any[]> = {};
    for (const item of items) {
      const aisle = item.item.item_aisle?.toString() ?? 'Unknown';
      if (!groups[aisle]) {
        groups[aisle] = [];
      }
      groups[aisle].push(item);
    }

    // Sort aisles by your custom order
    return Object.fromEntries(
      Object.entries(groups).sort(([a], [b]) => {
        const indexA = this.aisleOrder.indexOf(a);
        const indexB = this.aisleOrder.indexOf(b);

        const safeIndexA = indexA !== -1 ? indexA : Number.MAX_SAFE_INTEGER;
        const safeIndexB = indexB !== -1 ? indexB : Number.MAX_SAFE_INTEGER;

        return safeIndexA - safeIndexB;
      })
    );
  }

  deleteList(){
    this.supaService.deleteList(this.listGUID);
    this.router.navigate(['/my-lists']);
  }

}
