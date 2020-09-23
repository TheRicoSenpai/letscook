import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NotificationService } from "../notification/notification.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ShoppingListItem } from "~/app/model/shopping-list-item";

@Injectable({
  providedIn: "root"
})
export class ShoppingListService {

  needsRefresh = new EventEmitter();

  constructor(private http: HttpClient,
              private notificationService: NotificationService) { }

  getShoppingList(cookId: string): Observable<any> {
    return this.http.get(`https://localhost:44386/shopping-list/${cookId}`).pipe(
      map((value: Array<ShoppingListItem>) => value)
    );
  }

  postShoppingListItem(cookId: string, sli: ShoppingListItem, withNotification: boolean) {
    this.http.post<ShoppingListItem>(`https://localhost:44386/shopping-list/${cookId}`, sli).subscribe(() => {
      this.needsRefresh.emit();
      if (withNotification){
        this.notificationService.success("Ingredient added to your shopping list.");
      }
    },
    (err) => {
      console.log(err);
      this.notificationService.error("Error server !");
    });
  }

  putShoppingListItem(cookId: string, sli: ShoppingListItem) {
    this.http.put(`https://localhost:44386/shopping-list/${cookId}/${sli.id}`, sli).subscribe(() => {
      // this.notificationService.success("Inventory modified");
      this.needsRefresh.emit();
    },
    (err) => {
      console.log(err);
      this.notificationService.error("Error server !");
    });
  }
  putShoppingList(cookId: string, sl: Array<ShoppingListItem>) {
    this.http.put(`https://localhost:44386/shopping-list/${cookId}`, sl).subscribe(() => {
      // this.notificationService.success("Inventory modified");
      this.needsRefresh.emit();
    },
    (err) => {
      console.log(err);
      this.notificationService.error("Error server !");
    });
  }

  deleteShoppingListItem(cookId: string, id: string, msg: string) {
    console.log("cookId: " + cookId + " id: " + id);
    this.http.delete<ShoppingListItem>(`https://localhost:44386/shopping-list/${cookId}/${id}`).subscribe(() => {
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
