import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SupabaseService } from '../services/supa/supa.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {
  constructor(private supabaseService: SupabaseService, private router: Router) {}

  canActivate() {
    return this.supabaseService.authState$.pipe(
      map(session => {
        if (session) return true;
        this.router.navigate(['/']);
        return false;
      })
    );
  }
}
