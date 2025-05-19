import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { AsyncPipe, NgIf } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Session } from '@supabase/supabase-js';
import { SupabaseService } from '../../services/supa/supa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    AsyncPipe,
    NgIf,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly breakpointObserver: BreakpointObserver;
  isHandset$: Observable<boolean>;
  activeSession: Session | null = null;

  constructor(
    breakpointObserver: BreakpointObserver,
    private supaService: SupabaseService,
    private router: Router
  ) {
    this.breakpointObserver = breakpointObserver;
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
  }

  ngOnInit() {
    this.supaService.session$.subscribe(session => this.activeSession = session);
  }

  async logout() {
    await this.supaService.signOut();
    this.router.navigate(['/login']);
  }

}
