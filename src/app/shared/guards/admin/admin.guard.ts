import { CanActivate, Router } from '@angular/router';
import { SupabaseService } from '../../services/supa/supa.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class AdminGuard implements CanActivate {

    constructor(private supabaseService: SupabaseService, private router: Router) {}

    async canActivate() {

      const isAdmin = await this.supabaseService.isAdmin();

      if(isAdmin){
        return true
      }
      this.router.navigate(['/']);
      return false;
    }

};
