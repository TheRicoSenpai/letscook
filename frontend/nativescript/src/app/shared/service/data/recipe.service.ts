import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Recipe } from "~/app/model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { NotificationService } from "../notification/notification.service";

@Injectable({
  providedIn: "root"
})
export class RecipeService {
  needsRefresh = new EventEmitter();

  constructor(private http: HttpClient,
              private notificationService: NotificationService) { }

  getAllRecipes(): Observable<any> {
    return this.http.get("https://localhost:44386/recipes").pipe(
      map((value: Array<Recipe>) => value)
    );
  }

  getRecipe(id: string): Observable<any> {
    return this.http.get(`https://localhost:44386/recipes/${id}`).pipe(
      map((value: Recipe) => value)
    );
  }

  postRecipe(recipe: Recipe) {
    this.http.post<Recipe>(`https://localhost:44386/recipes`, recipe).subscribe(() => {
        this.needsRefresh.emit();
        this.notificationService.success("Recipe added to your collection.");
      },
      (err) => {
        console.log(err);
        this.notificationService.error("Error server !");
      });
  }
  putRecipe(recipe: Recipe) {
    this.http.put(`https://localhost:44386/recipes/${recipe.id}`, recipe).subscribe(() => {
      this.notificationService.success("Recipe modified");
      this.needsRefresh.emit();
    },
    (err) => {
      console.log(err);
      this.notificationService.error("Error server !");
    });
  }

  delete(id: string) {
    this.http.delete<Recipe>(`https://localhost:44386/recipes/${id}`).subscribe(() => {
      this.notificationService.success("Recipe deleted");
      this.needsRefresh.emit();
    },
    (err) => {
      console.log(err);
    });
  }
}
