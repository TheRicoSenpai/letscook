import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NotificationService } from "../notification/notification.service";
import { Observable } from "rxjs";
import { Settings } from "~/app/model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class SettingsService {
  
  needsRefresh = new EventEmitter();
  constructor(private http: HttpClient,
              private notificationService: NotificationService) { }

  getSettings(cookId: string): Observable<any> {
    return this.http.get(`https://localhost:44386/settings/${cookId}`).pipe(
      map((value: Array<Settings>) => value)
    );
  }

  putSettings(cookId: string, settings: Settings) {
    this.http.put(`https://localhost:44386/settings/${cookId}`, settings).subscribe(() => {
      this.notificationService.success("Settings modified");
      this.needsRefresh.emit();
    },
    (err) => {
      console.log(err);
      this.notificationService.error("Error server !");
    });
  }
}
