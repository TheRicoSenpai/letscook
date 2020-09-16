import { Component, OnInit } from '@angular/core';
import { FoodType, Ingredient, Inventory, Cook } from '../model';
import { MatDialog } from '@angular/material/dialog';
import { IngredientDialogComponent } from '../ingredients/ingredient-dialog/ingredient-dialog.component';
import { FormGroup, FormBuilder, Form } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../core/shared/component/confirm-dialog/confirm-dialog.component';
import { ShoppingListItem } from '../model/shopping-list-item';
import { CookComponent } from '../core/shared/component/cook/cook.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../core/shared/service/notification/notification.service';
import { IngredientHelper } from '../core/shared/helpers/ingredient/ingredient-helper';
import { InventoryHelper } from '../core/shared/helpers/inventory/inventory-helper';
import { ShoppingListHelper } from '../core/shared/helpers/shopping-list/shopping-list-helper';
import { InventoryService } from '../core/shared/service/data/inventory.service';
import { CooksService } from '../core/shared/service/data/cooks.service';
import { ShoppingListService } from '../core/shared/service/data/shopping-list.service';

class FoodGroup {
  type: string;
  ingredients: Ingredient[];
}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent extends CookComponent implements OnInit {
  inventory: Ingredient[];
  foodGroups: Observable<FoodGroup[]>;
  constructor(cooksService: CooksService,
              inventoryService: InventoryService,
              shoppingListService: ShoppingListService,
              private notificationService: NotificationService,
              FB: FormBuilder,
              DIALOG: MatDialog,
              snackBar: MatSnackBar) {
    super(FB, DIALOG, snackBar, cooksService, inventoryService, null, shoppingListService);
  }

  ngOnInit(): void {
    // this.inventory = this.cook?.inventory;
    // this.inventoryService.getStock(this.cook?.id).subscribe(
    //   value => {
    //     this.inventory = value;
    //     this.refreshInventory();
    // }
    // );
    if (this.inventory && this.inventory?.length > 0){
      this.refreshInventory();
    }
  }
  displayIngredient(ing: Ingredient){
    return IngredientHelper.displayIngredient(ing);
  }
  openInsertIngredient(): void {
    const dialogRef = this.dialog.open(IngredientDialogComponent, {
      data: new Ingredient()
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result as Ingredient){
        InventoryHelper.addIngredient(this.inventory, result);
        this.inventoryService.postStockIngredient(this.cook?.id, result);
        // this.notificationService.success('Article(s) added');
      }
      this.refreshInventory();
    });
  }
  removeIngredient(ing: Ingredient): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: 'Item will be removed permanently !'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.inventory.splice(this.inventory.indexOf(ing), 1);
        this.inventoryService.deleteStockIngredient(this.cook?.id, ing.id);
        // this.notificationService.success('Article(s) removed');
      }
      this.refreshInventory();
    });
  }
  addIngredientToShoppingList(ing: Ingredient): void {
    const dialogRef = this.dialog.open(IngredientDialogComponent, {
      data: new Ingredient(ing.quantity, ing.unit, ing.type, ing.foodType, ing.favorite)
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        ShoppingListHelper.addItem(this.cook.shoppingList, new ShoppingListItem(result, false));
        // this.notificationService.success('Article(s) added to your shopping list');
        this.shoppingListService.postShoppingListItem(this.cook?.id, new ShoppingListItem(result, false), true);
      }
    });
  }
  openUpdateIngredient(ing: Ingredient): void {
    const dialogRef = this.dialog.open(IngredientDialogComponent, {
      data: ing
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        ing = result;
        this.inventoryService.putStockIngredient(this.cook?.id, result);
        // this.notificationService.success('Article(s) updateds');
      }
      this.refreshInventory();
    });
  }

  refreshInventory() {
    this.foodGroups = of(Object.keys(FoodType)
      .sort()
      .map(ft => (
        {
          type: ft,
          ingredients: this.inventory?.filter(i => i.foodType === ft).sort((a, b) => a.type.localeCompare(b.type))
        }) ));
  }
  refresh() {
    // this.inventory = this.cook?.inventory;
    this.inventoryService.getStock(this.cook?.id).subscribe(value => {
      this.inventory = value;
      this.refreshInventory();
    });
  }
}
