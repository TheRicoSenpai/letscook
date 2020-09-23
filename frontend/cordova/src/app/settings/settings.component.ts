import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { CookComponent } from '../core/shared/component/cook/cook.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { COOK } from '../Mock/cook';
import { NotificationService } from '../core/shared/service/notification/notification.service';
import { ConfirmDialogComponent } from '../core/shared/component/confirm-dialog/confirm-dialog.component';
import { ThemingService } from '../core/shared/service/theme/theming.service';
import { CooksService } from '../core/shared/service/data/cooks.service';
import { SettingsService } from '../core/shared/service/data/settings.service';
import { Cook } from '../model/cook';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent extends CookComponent implements OnInit, OnDestroy {
  form: FormGroup;
  languages = [
    {lang: 'fr', text: 'French'}, {lang: 'eng', text: 'English'}];

  constructor(
      cooksService: CooksService,
      private settingsService: SettingsService,
      private themingService: ThemingService,
      notificationService: NotificationService,
      FB: FormBuilder,
      DIALOG: MatDialog,
      snackBar: MatSnackBar) {
    super(FB, DIALOG, snackBar, cooksService, null, null, null, notificationService);
  }

  ngOnDestroy(){
     this.themingService.theme.next(this.cook?.settings?.darkTheme ? 'dark-theme' : 'light-theme');
  }

  ngOnInit(): void {
    this.cooksService.needsRefresh.subscribe(value => {
      this.initForm(this.cook);
    });
    this.initForm(this.cook);
    this.themingService.theme.next(this.form.controls.darkTheme.value ? 'dark-theme' : 'light-theme');
  }

  initForm(cook: Cook){
    this.form = this.fb.group({
      pseudo: cook?.settings.pseudo,
      photoPath: cook?.settings.photoPath,
      cache: cook?.settings?.cache,
      darkTheme: cook?.settings?.darkTheme,
      lang: cook?.settings?.lang
    });
    this.form.updateValueAndValidity();
  }

  toggleDarkTheme(checked: boolean){
    this.themingService.theme.next(checked ? 'dark-theme' : 'light-theme');
  }

  login(): void{
    this.cook = COOK;
  }

  logout(): void{
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: 'Test !'
    });
    dialogRef.afterClosed().subscribe((value) => {
      if (value){
        this.cook = undefined;
      }
    });
  }
  save() {
    this.cook.settings.pseudo = this.form.controls.pseudo.value;
    this.cook.settings.photoPath = this.form.controls.photoPath.value;
    this.cook.settings.cache = this.form.controls.cache.value;
    this.cook.settings.darkTheme = this.form.controls.darkTheme.value;
    this.cook.settings.lang = this.form.controls.lang.value;
    this.settingsService.putSettings(this.cook?.id, this.cook.settings);
    this.form.markAsPristine();
    this.notificationService.success('Settings saved');
  }

  openDialog(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: 'Test !'
    });
  }

  openSnackbar(kind?: string): void{
    switch (kind) {
      case 'info':
        this.notificationService.info('Test Snackbar');
        break;
      case 'warn':
        this.notificationService.warn('Test Snackbar');
        break;
      case 'error':
        this.notificationService.error('Test Snackbar');
        break;
      case 'success':
        this.notificationService.success('Test Snackbar');
        break;
      default:
        this.notificationService.default('Test Snackbar');
        break;
    }
  }
}
