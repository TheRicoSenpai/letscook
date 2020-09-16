import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../notification/notification.service';
import { Observable } from 'rxjs';
import { Settings } from 'src/app/model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient,
              private notificationService: NotificationService) { }

    public needsRefresh = new EventEmitter();

    public getSettings(cookId: string): Observable<any>{
      return this.http.get(`https://localhost:44386/settings/${cookId}`).pipe(
        map((value: Settings[]) => value)
      );
    }

    // public postSettings(settings: Settings){
    //   this.http.post<Settings>(`https://localhost:44386/settings`, settings).subscribe(() =>
    //   {
    //     this.needsRefresh.emit();
    //     this.notificationService.success('Ingredient added to your inventory.');
    //   },
    //   (err) => {
    //     console.log(err);
    //     this.notificationService.error('Error server !');
    //   });
    // }

    public putSettings(cookId: string, settings: Settings){
      this.http.put(`https://localhost:44386/settings/${cookId}`, settings).subscribe(() =>
      {
        this.notificationService.success('Settings modified');
        this.needsRefresh.emit();
      },
      (err) => {
        console.log(err);
        this.notificationService.error('Error server !');
      });
    }

    // public deleteSettings(id: string){
    //   this.http.delete<Settings>(`https://localhost:44386/settings/${id}`).subscribe(() =>
    //   {
    //     this.needsRefresh.emit();
    //   },
    //   (err) => {
    //     console.log(err);
    //   });
    // }
  }
