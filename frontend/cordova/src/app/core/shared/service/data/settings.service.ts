import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../notification/notification.service';
import { Observable } from 'rxjs';
import { Settings } from 'src/app/model';
import { map } from 'rxjs/operators';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService extends BaseService {

  constructor(private http: HttpClient,
              private notificationService: NotificationService) { super();  }

    private controller = 'settings';

    public getSettings(cookId: string): Observable<any>{
      return this.http.get(`${this.url}/${this.controller}/${cookId}`).pipe(
        map((value: Settings[]) => value)
      );
    }

    public putSettings(cookId: string, settings: Settings){
      this.http.put(`${this.url}/${this.controller}/${cookId}`, settings).subscribe(() =>
      {
        this.notificationService.success('Settings modified');
        this.needsRefresh.emit();
      },
      (err) => {
        console.log(err);
        this.notificationService.error('Error server !');
      });
    }
  }
