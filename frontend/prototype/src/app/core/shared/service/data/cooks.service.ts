import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../notification/notification.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cook } from 'src/app/model/cook';

@Injectable({
  providedIn: 'root'
})
export class CooksService {

  constructor(private http: HttpClient,
              private notificationService: NotificationService) { }

  public needsRefresh = new EventEmitter();

  public getCook(id: string): Observable<any>{
    return this.http.get(`https://localhost:44386/cooks/${id}`).pipe(
      map((value: Cook) => value),
    );
  }

  public EmitsRefreshSignal(){
    this.needsRefresh.emit();
  }

}
