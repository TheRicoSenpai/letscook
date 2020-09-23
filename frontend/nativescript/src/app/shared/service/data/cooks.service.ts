import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NotificationService } from "../notification/notification.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Cook } from "~/app/model";

@Injectable({
  providedIn: "root"
})
export class CooksService {

  needsRefresh = new EventEmitter();

  constructor(private http: HttpClient,
              private notificationService: NotificationService) { }

  getCook(id: string): Observable<any> {
    return this.http.get(`https://localhost:44386/cooks/${id}`).pipe(
      map((value: Cook) => value)
    );
  }

  EmitsRefreshSignal() {
    this.needsRefresh.emit();
  }

}
