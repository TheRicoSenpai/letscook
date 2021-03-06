import {Cook} from '../../../../model/cook';
import { Input, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CooksService } from '../../service/data/cooks.service';
import { COOK } from '../../../../Mock/cook';
import { InventoryService } from '../../service/data/inventory.service';
import { RecipeService } from '../../service/data/recipe.service';
import { ShoppingListService } from '../../service/data/shopping-list.service';
import { NotificationService } from '../../service/notification/notification.service';

@Component({
    selector: 'app-cook',
    template: '',
    styles: []
  })
export abstract class CookComponent{
    @Input()
    cook: Cook;

    constructor(protected fb: FormBuilder,
                public dialog: MatDialog,
                protected snackBar: MatSnackBar,
                public cooksService?: CooksService,
                public inventoryService?: InventoryService,
                public recipeService?: RecipeService,
                public shoppingListService?: ShoppingListService,
                public notificationService?: NotificationService) {
      this.cooksService?.needsRefresh.subscribe(() => this.refresh());
      this.cooksService.getCook(COOK.id).subscribe(
      // this.cooksService.getCook().subscribe(
        value => {
          this.cook = value;
          this.cooksService.EmitsRefreshSignal();
          // this.notificationService.success('Cook info OK');
        },
        error => {
          this.notificationService.error(error.message);
        },
        () => {
          // this.notificationService.success('Cook info retrieved from server');
        });
    }

    public refresh(){
    }
}
