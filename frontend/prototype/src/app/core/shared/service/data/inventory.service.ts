import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../notification/notification.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ingredient } from 'src/app/model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService extends BaseService {

  constructor(private http: HttpClient,
              private notificationService: NotificationService) { super(); }

  private controller = 'inventory';

  public getStock(cookId: string): Observable<any>{
    return this.http.get(`${this.url}/${this.controller}/${cookId}`).pipe(
      map((value: Ingredient[]) => value)
    );
  }


  public postStockIngredient(cookId: string, ingredient: Ingredient){
    if (ingredient){
      this.http.post<Ingredient>(`${this.url}/${this.controller}/${cookId}`, ingredient).subscribe(() =>
      {
        this.needsRefresh.emit();
        this.notificationService.success('Ingredient added to your inventory.');
      },
      (err) => {
        console.log(err);
        this.notificationService.error('Error server !');
      });
    }
  }

  public putStockIngredient(cookId: string, ingredient: Ingredient){
    if (ingredient){
      this.http.put(`${this.url}/${this.controller}/${cookId}`, ingredient).subscribe(() =>
      {
        this.notificationService.success('Inventory modified');
        this.needsRefresh.emit();
      },
      (err) => {
        console.log(err);
        this.notificationService.error('Error server !');
      });
    }
  }

  public deleteStockIngredient(cookId: string, id: string){
    this.http.delete<Ingredient>(`${this.url}/${this.controller}/${cookId}/${id}`).subscribe(() =>
    {
      this.notificationService.success('Ingredient deleted');
      this.needsRefresh.emit();
    },
    (err) => {
      console.log(err);
    });
  }
}
