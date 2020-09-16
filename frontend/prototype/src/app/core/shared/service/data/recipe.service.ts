import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Recipe } from 'src/app/model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private http: HttpClient,
              private notificationService: NotificationService) { }

  public needsRefresh = new EventEmitter();

  reqHeader = new HttpHeaders().set('Content-Type', 'application/json')
  .set('Accept', 'application/json');

  public getAllRecipes(): Observable<any>{
    return this.http.get('https://localhost:44386/recipes').pipe(
      map((value: Recipe[]) => value)
    );
  }

  public getRecipe(id: string): Observable<any>{
    return this.http.get(`https://localhost:44386/recipes/${id}`).pipe(
      map((value: Recipe) => value)
    );
  }

  public postRecipe(recipe: Recipe){
    this.http.post<Recipe>(`https://localhost:44386/recipes`, recipe).subscribe(() =>
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
    this.http.put(`https://localhost:44386/recipes/${recipe.id}`, recipe).subscribe(() =>
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
    this.http.delete<Recipe>(`https://localhost:44386/recipes/${id}`).subscribe(() =>
    {
      this.notificationService.success('Recipe deleted');
      this.needsRefresh.emit();
    },
    (err) => {
      console.log(err);
    });
  }
}
