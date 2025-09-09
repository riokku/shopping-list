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

  async isAdmin(): Promise<boolean>{
    const { data: { user } }  = await this.getUser();

    if (!user) {
      return false;
    }

    const { data: profile, error } = await this.supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (error || !profile) {
      console.error('Error fetching profile', error);
      return false;
    }

    return profile.role === 'admin';

  }

  //Setting up new list options
  async getStoreItems(store: string){
    const { data, error } = await this.supabase
    .from(store)
    .select('*')
    if (error) {
      throw new Error(error.message);
    }
    return data ?? [];
  }

  //Managing lists
  async submitList(storeName: string | undefined, storeAddress: string | undefined, storeLogo: string| undefined, listItems:ShoppingListItemModel[], author: string) {
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
        store_address: storeAddress,
        store_logo: storeLogo,
        items: listItems,
        created_by_name: author
      }
    ]);

    if (error) {
      console.error('Error submitting list:', error.message);
    } else {
      console.log('Shopping list submitted!');
      this.router.navigate(['/my-lists']);
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

  async getSpecificList(listGUID: string | undefined): Promise<any[]> {

    const { data, error } = await this.supabase
      .from('shopping_lists')
      .select('*')
      .eq('list_id', listGUID)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data ?? [];
  }

  async deleteList(listGUID: string | undefined){
    const { error } = await this.supabase
      .from('shopping_lists')
      .delete()
      .eq('list_id', listGUID)
  }

  //Managing inventory
  async getItems(store: string){
    const { data, error } = await this.supabase
    .from(store)
    .select('*')
    if (error) {
      throw new Error(error.message);
    }
    return data ?? [];
  }

  async addItem(item: any){
    const { data, error } = await this.supabase
    .from('safeway_pullman')
    .insert([
      {
        item_name: item.name,
        item_aisle: item.aisle
      }
    ])
    .select()
    if (error) {
      throw new Error(error.message);
    }
  }

  async deleteItem(item: any){
    const { error } = await this.supabase
      .from('safeway_pullman')
      .delete()
      .eq('item_name', item.item_name)
  }

  async updateItemn(item: any, id: number | undefined){
    const { data, error } = await this.supabase
    .from('safeway_pullman')
    .update(
      {
        item_name: item.name,
        item_aisle: item.aisle
      }
    )
    .eq('id', id)
    .select()
  }

}
