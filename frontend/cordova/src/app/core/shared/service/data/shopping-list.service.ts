import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../notification/notification.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShoppingListItem } from 'src/app/model/shopping-list-item';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService extends BaseService {

  constructor(private http: HttpClient,
              private notificationService: NotificationService) { super(); }

  private controller = 'shopping-list';

  public getShoppingList(cookId: string): Observable<any>{
    return this.http.get(`${this.url}/${this.controller}/${cookId}`).pipe(
      map((value: ShoppingListItem[]) => value)
    );
  }


  public postShoppingListItem(cookId: string, sli: ShoppingListItem, withNotification: boolean){
    this.http.post<ShoppingListItem>(`${this.url}/${this.controller}/${cookId}`, sli).subscribe(() =>
    {
      this.needsRefresh.emit();
      if (withNotification){
        this.notificationService.success('Ingredient added to your shopping list.');
      }
    },
    (err) => {
      console.log(err);
      this.notificationService.error('Error server !');
    });
  }

  public putShoppingListItem(cookId: string, sli: ShoppingListItem){
    this.http.put(`${this.url}/${this.controller}/${cookId}/${sli.id}`, sli).subscribe(() =>
    {
      // this.notificationService.success('Inventory modified');
      this.needsRefresh.emit();
    },
    (err) => {
      console.log(err);
      this.notificationService.error('Error server !');
    });
  }
  public putShoppingList(cookId: string, sl: ShoppingListItem[]){
    this.http.put(`${this.url}/${this.controller}/${cookId}`, sl).subscribe(() =>
    {
      // this.notificationService.success('Inventory modified');
      this.needsRefresh.emit();
    },
    (err) => {
      console.log(err);
      this.notificationService.error('Error server !');
    });
  }

  public deleteShoppingListItem(cookId: string, id: string, msg: string){
    console.log('cookId: ' + cookId + ' id: ' + id);
    this.http.delete<ShoppingListItem>(`${this.url}/${this.controller}/${cookId}/${id}`).subscribe(() =>
    {
      this.needsRefresh.emit();
      if (msg) {
        this.notificationService.success(msg);
      }
    },
    (err) => {
      console.log(err);
    });
  }
}
