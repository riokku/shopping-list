import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, AuthChangeEvent, Session } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { ShoppingListItemModel } from '../../models/shopping-list-item.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private authState = new BehaviorSubject<Session | null>(null);

  session$ = this.authState.asObservable();

  constructor(private router: Router) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey);

    this.supabase.auth.getSession().then(({ data }) => {
      this.authState.next(data.session);
    });

    // Listen for auth state changes
    this.supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
      this.authState.next(session);
    });
  }

  get authState$() {
    return this.authState.asObservable();
  }

  async signUp(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
  }

  getUser() {
    return this.supabase.auth.getUser();
  }

  //Managing lists
  async submitList(storeName: string | undefined, listItems:ShoppingListItemModel[], author: string) {
    const { data: userData, error: authError } = await this.supabase.auth.getUser();
    const userId = userData?.user?.id;

    if (!userId) {
      console.error('User not authenticated');
      return;
    }

    const { error } = await this.supabase.from('shopping_lists').insert([
      {
        user_id: userId,
        store_name: storeName,
        items: listItems,
        created_by_name: author
      }
    ]);

    if (error) {
      console.error('Error submitting list:', error.message);
    } else {
      console.log('Shopping list submitted!');
      this.router.navigate(['/']);
    }
  }

async getUserShoppingLists(): Promise<any[]> {
    const { data: userData, error: authError } = await this.supabase.auth.getUser();
    const userId = userData?.user?.id;

    if (!userId) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await this.supabase
      .from('shopping_lists')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data ?? [];
  }

}
