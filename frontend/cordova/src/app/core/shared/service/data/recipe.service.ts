import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Recipe } from 'src/app/model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationService } from '../notification/notification.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService extends BaseService {
  constructor(private http: HttpClient,
              private notificationService: NotificationService) { super(); }

  private controller = 'recipes';

  public getAllRecipes(): Observable<any>{
    return this.http.get(`${this.url}/${this.controller}`).pipe(
      map((value: Recipe[]) => value)
    );
  }

  public getRecipe(id: string): Observable<any>{
    return this.http.get(`${this.url}/${this.controller}/${id}`).pipe(
      map((value: Recipe) => value)
    );
  }

  public postRecipe(recipe: Recipe){
    this.http.post<Recipe>(`${this.url}/${this.controller}`, recipe).subscribe(() =>
      {
        this.needsRefresh.emit();
        this.notificationService.success('Recipe added to your collection.');
      },
      (err) => {
        console.log(err);
        this.notificationService.error('Error server !');
      });
  }
  public putRecipe(recipe: Recipe){
    this.http.put(`${this.url}/${this.controller}/${recipe.id}`, recipe).subscribe(() =>
    {
      this.notificationService.success('Recipe modified');
      this.needsRefresh.emit();
    },
    (err) => {
      console.log(err);
      this.notificationService.error('Error server !');
    });
  }

  public delete(id: string){
    this.http.delete<Recipe>(`${this.url}/${this.controller}/${id}`).subscribe(() =>
    {
      this.notificationService.success('Recipe deleted');
      this.needsRefresh.emit();
    },
    (err) => {
      console.log(err);
    });
  }
}
