import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../notification/notification.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ingredient } from 'src/app/model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient,
              private notificationService: NotificationService) { }

  public needsRefresh = new EventEmitter();

  public getStock(cookId: string): Observable<any>{
    return this.http.get(`https://localhost:44386/inventory/${cookId}`).pipe(
      map((value: Ingredient[]) => value)
    );
  }


  public postStockIngredient(cookId: string, ingredient: Ingredient){
    if (ingredient){
      this.http.post<Ingredient>(`https://localhost:44386/inventory/${cookId}`, ingredient).subscribe(() =>
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
      this.http.put(`https://localhost:44386/inventory/${cookId}`, ingredient).subscribe(() =>
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
    this.http.delete<Ingredient>(`https://localhost:44386/inventory/${cookId}/${id}`).subscribe(() =>
    {
      this.notificationService.success('Ingredient deleted');
      this.needsRefresh.emit();
    },
    (err) => {
      console.log(err);
    });
  }
}
