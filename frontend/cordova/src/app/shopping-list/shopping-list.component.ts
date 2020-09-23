import { Component, OnInit } from '@angular/core';
import { ConfirmDialogComponent } from '../core/shared/component/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ShoppingList, Inventory, Ingredient } from '../model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ShoppingListItem } from '../model/shopping-list-item';
import { CookComponent } from '../core/shared/component/cook/cook.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { map } from 'rxjs/operators';
import { NotificationService } from '../core/shared/service/notification/notification.service';
import { IngredientHelper } from '../core/shared/helpers/ingredient/ingredient-helper';
import { ShoppingListHelper } from '../core/shared/helpers/shopping-list/shopping-list-helper';
import { InventoryHelper } from '../core/shared/helpers/inventory/inventory-helper';
import { ShoppingListService } from '../core/shared/service/data/shopping-list.service';
import { InventoryService } from '../core/shared/service/data/inventory.service';
import { CooksService } from '../core/shared/service/data/cooks.service';

interface ShoppingListItemDetail {
  shoppingListItem: ShoppingListItem;
  detailVisible: boolean;
}

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent extends CookComponent implements OnInit {
  shoppingList: ShoppingListItem[];
  items: Observable<ShoppingListItemDetail[]>;
  itemDetail: ShoppingListItemDetail = {
    shoppingListItem: new ShoppingListItem(new Ingredient(), false),
    detailVisible: false
  };
  lastSLIDVisible: ShoppingListItemDetail;
  form: FormGroup;
  detailVisible = false;
  constructor(cooksService: CooksService,
              shoppingListService: ShoppingListService,
              inventoryService: InventoryService,
              FB: FormBuilder,
              DIALOG: MatDialog,
              snackBar: MatSnackBar,
              notificationService: NotificationService) {
    super(FB, DIALOG, snackBar, cooksService, inventoryService, null, shoppingListService, notificationService);
  }

  ngOnInit(): void {
    this.shoppingListService.needsRefresh.subscribe(() => this.refreshShoppingList(this.cook?.id));
    this.shoppingList = this.cook?.shoppingList;
    this.refreshShoppingList(this.cook?.id);
    if (this.shoppingList && this.shoppingList.length > 0){
      this.refreshObservableList();
    }
    this.initFormGroup();
  }
  initFormGroup(slid?: ShoppingListItemDetail){
    this.form = this.fb.group({
      name: slid?.shoppingListItem.ingredient.type ?? '',
      quantity: slid?.shoppingListItem.ingredient.quantity ?? undefined,
      unit: slid?.shoppingListItem.ingredient.unit ?? '',
      foodType: slid?.shoppingListItem.ingredient.foodType ?? ''
    });
  }
  refreshShoppingList(cookId: string) {
    this.shoppingListService.getShoppingList(cookId).subscribe(
      (value: ShoppingListItem[]) => {
        this.shoppingList = value;
        if (this.shoppingList && this.shoppingList.length > 0){
            this.refreshObservableList();
        }
      }
    );
  }

  displayIngredient(ing: Ingredient){
    return IngredientHelper.displayIngredient(ing);
  }

  openConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: 'All checked items will be added to your inventory.'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let errors = 0;
        this.shoppingList.filter(i => i.isChecked).forEach(element => {
          if (InventoryHelper.addIngredient(this.cook.inventory, element.ingredient)){
            this.inventoryService.postStockIngredient(this.cook?.id, element.ingredient);
            ShoppingListHelper.removeItem(this.shoppingList, element);
            this.shoppingListService.deleteShoppingListItem(this.cook.id, element.id, 'Articles added in your inventory');
          }
          else{
            errors++;
          }
        });
        if (errors > 0){
          this.notificationService.error('Error while adding ingredient to the inventory !');
        }
        else{
          this.notificationService.success('All ingredients added to the inventory.');
        }
        // this.refreshObservableList();
      }
    });
  }

  refreshObservableList(){
    this.items = of(this.shoppingList.map(li => ({shoppingListItem: li, detailVisible: false})));
  }

  addItem(slid: ShoppingListItemDetail) {
    const newItem = new ShoppingListItem(new Ingredient(
        this.form.controls.quantity.value,
        this.form.controls.unit.value,
        this.form.controls.name.value,
        this.form.controls.foodType.value,
        false
      ), slid.shoppingListItem.isChecked);
    ShoppingListHelper.addItem(this.shoppingList, newItem);
    this.shoppingListService.postShoppingListItem(this.cook.id, newItem, false);
    this.itemDetail.shoppingListItem.isChecked = false;
    this.itemDetail.detailVisible = false;
    this.setDetailVisible(slid, false);
    // this.refreshObservableList();
  }
  modifyItem(slid?: ShoppingListItemDetail){
    this.setDetailVisible(slid, true);
  }
  updateItem(slid: ShoppingListItemDetail){
    slid.shoppingListItem.ingredient.quantity = this.form.controls.quantity.value;
    slid.shoppingListItem.ingredient.unit = this.form.controls.unit.value;
    slid.shoppingListItem.ingredient.type = this.form.controls.name.value;
    slid.shoppingListItem.ingredient.foodType = this.form.controls.foodType.value;
    this.shoppingListService.putShoppingListItem(this.cook.id, slid.shoppingListItem);
    this.setDetailVisible(slid, false);
  }
  updateCkeckedItem(slid: ShoppingListItemDetail) {
    slid.shoppingListItem.isChecked = !slid.shoppingListItem.isChecked;
    this.shoppingListService.putShoppingListItem(this.cook.id, slid.shoppingListItem);
  }

  cancelItem(slid: ShoppingListItemDetail) {
    this.setDetailVisible(slid, false);
  }
  removeItem(slid: ShoppingListItemDetail) {
    ShoppingListHelper.removeItem(this.shoppingList, slid.shoppingListItem);
    this.shoppingListService.deleteShoppingListItem(this.cook.id, slid.shoppingListItem.id, undefined);
    this.initFormGroup();
    // this.refreshObservableList();
  }
  setDetailVisible(slid: ShoppingListItemDetail, isVisible: boolean){
    if (this.lastSLIDVisible){
      this.lastSLIDVisible.detailVisible = false;
    }
    slid.detailVisible = isVisible;
    this.initFormGroup(isVisible ? slid : undefined);
    this.lastSLIDVisible = slid;
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    this.items.pipe(
       map((value) => {
        this.cook.shoppingList = value.map(v => v.shoppingListItem);
        })
      )
    .subscribe();
    this.shoppingListService.putShoppingList(this.cook?.id, this.cook.shoppingList);
  }
  refresh() {
    this.refreshShoppingList(this.cook?.id);
  }
}
