import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../notification/notification.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cook } from 'src/app/model/cook';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CooksService extends BaseService {

  constructor(private http: HttpClient,
              private notificationService: NotificationService) { super(); }

  private controller = 'cooks';

  public getCook(id: string): Observable<any>{
    return this.http.get(`${this.url}/${this.controller}/${id}`).pipe(
      map((value: Cook) => value),
    );
  }

  public EmitsRefreshSignal(){
    this.needsRefresh.emit();
  }

}
