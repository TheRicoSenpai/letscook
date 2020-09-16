//#region imports
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Recipe } from 'src/app/model/recipe';
import { MatDialog } from '@angular/material/dialog';
import { ShowDialog } from '../../core/shared/component/open-dialog-methods/open-dialog-methods';
import { RecipeDialogComponent } from '../recipe-dialog/recipe-dialog.component';
import { RecipeType, Ingredient, Cook } from 'src/app/model';
import { ConfirmDialogComponent } from 'src/app/core/shared/component/confirm-dialog/confirm-dialog.component';
import { ShoppingListItem } from 'src/app/model/shopping-list-item';
import {IngredientComparer} from '../../core/shared/helpers/ingredient/ingredient-comparer';
import {Realizeable} from '../../core/shared/helpers/recipe/recipe-realizeable.enum';
import {RecipeHelper} from '../../core/shared/helpers/recipe/recipe-helper';
import {IngredientHelper} from '../../core/shared/helpers/ingredient/ingredient-helper';
import {InventoryHelper} from '../../core/shared/helpers/inventory/inventory-helper';

import { ConfirmIngredientDialogComponent } from '../confirm-ingredient-dialog/confirm-ingredient-dialog.component';
import { NotificationService } from 'src/app/core/shared/service/notification/notification.service';
import { RecipeService } from 'src/app/core/shared/service/data/recipe.service';
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';
import { ShoppingListService } from 'src/app/core/shared/service/data/shopping-list.service';
import { InventoryService } from 'src/app/core/shared/service/data/inventory.service';
//#endregion

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})

export class RecipeDetailComponent implements OnInit {
  @Input()
  recipe: Recipe;
  @Input()
  stock: Ingredient[];
  @Input()
  cook: Cook;
  @Input()
  isReadonly = false;
  @Input()
  isRealizeable = false;
  @Output()
  realized = new EventEmitter();
  @Output()
  modified = new EventEmitter();

  nothingString = 'Nothing in stock';
  isPartial = false;
  isFull = true;
  recipeTypes: string[] = Object.keys(RecipeType).map(key => RecipeType[key]);
  servings: number;

  constructor(private inventoryService: InventoryService,
              private recipeService: RecipeService,
              private shoppingListService: ShoppingListService,
              public dialog: MatDialog,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    if (this.recipe) {
      this.servings = this.recipe.numberOfPeople;
      this.checkPartial();
    }
  }

  isFavorite(){
    if (!this.isReadonly){
      this.recipe.favorite = !this.recipe.favorite;
    }
    this.modified.emit();
  }

  stockIngredient(ing: Ingredient): string{
    switch (RecipeHelper.IsRecipeRealizeable(ing, this.stock, this.servings, this.recipe.numberOfPeople)) {
        case Realizeable.Similar:
          const stockSimilarIng = this.stock.filter(s => s.foodType === ing.foodType);
          // return stockSimilarIng.map(s => s.display()).toString();
          return stockSimilarIng.map(s => IngredientHelper.displayIngredient(s)).toString();
        case Realizeable.Full:
        case Realizeable.NotEnough:
          const stockIng = this.stock.find(s => IngredientComparer.TypeEquals(s, ing));
          return stockIng.quantity + ' ' + stockIng.unit;
        case Realizeable.None:
          return this.nothingString;
    }
  }
  stockIngredientExists(ing: Ingredient){
    return RecipeHelper.stockIngredientExists(ing, this.stock, this.servings, this.recipe.numberOfPeople);
  }

  checkPartial(){
    this.isFull = this.recipe.ingredients?.every(
      ing => RecipeHelper.IsRecipeRealizeable(ing, this.stock, this.servings, this.recipe.numberOfPeople) === Realizeable.Full
    );
    if (this.isFull){
      this.isPartial = false;
    }
    else {
      this.isPartial = !this.recipe.ingredients?.some(
        ing => {
          return RecipeHelper.IsRecipeRealizeable(ing, this.stock, this.servings, this.recipe.numberOfPeople) === Realizeable.None
            || RecipeHelper.IsRecipeRealizeable(ing, this.stock, this.servings, this.recipe.numberOfPeople) === Realizeable.NotEnough;
        }
      );
    }
  }
  displayIng(ing: Ingredient){
    // return ing?.display(this.servings / this.recipe.numberOfPeople);
    return IngredientHelper.displayIngredient(ing, this.servings / this.recipe.numberOfPeople);
  }
  modifyPeople(nbr: number){
    if (this.servings + nbr > 0){
      this.servings += nbr;
      this.checkPartial();
    }
  }
  public prepTime(){
    return this.recipe?.preparationTime + ' min';
  }
  public cookingTime(){
    return this.recipe?.cookingTime + ' min';
  }

  //#region Dialog
  openUpsertRecipeDialog() {
    const dialogRef = this.dialog.open(RecipeDialogComponent, {
        width: '70vh',
        data: this.recipe
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result){
          this.recipe = result;
          // go modifiy the recipe in the backend
          this.recipeService.putRecipe(this.recipe);
          // const r = RECIPES.find(recipe => recipe.CookId === this.recipe.CookId && recipe.id === this.recipe.id);
          // r.directions = this.recipe.directions;
          // r.ingredients = this.recipe.ingredients;
          // r.preparationTime = this.recipe.preparationTime;
          // r.cookingTime = this.recipe.cookingTime;
          // r.numberOfPeople = this.recipe.numberOfPeople;
          // r.name = this.recipe.name;
          // r.favorite = this.recipe.favorite;
          // this.modified.emit();
        }
    });
  }
  openConfirmDeleteDialog() {
    ShowDialog.openConfirmDialog(this.dialog, 'You are gonna delete this recipe.').subscribe(result => {
      if (result){
        this.recipeService.delete(this.recipe.id);
        this.modified.emit();
      }
    });
  }
  openConfirmaRealizedDialog() {
    const isRealized = this.dialog.open(
      ConfirmIngredientDialogComponent, {
        data: {
          ingredients: this.recipe.ingredients.map(ing => new Ingredient(
            ing.quantity * (this.servings / this.recipe.numberOfPeople),
            ing.unit,
            ing.type,
            ing.foodType,
            ing.favorite)
          ),
          stock: this.stock
        }
      }
    );
    isRealized.afterClosed().subscribe(result =>
      {
        this.handleRealizedResult(result);
      }
    );
  }
  openConfirmaRealizedPartialDialog() {
    const isRealized = this.dialog.open(
      ConfirmIngredientDialogComponent, {
        data: {
          ingredients: this.recipe.ingredients
          .filter(ing => RecipeHelper.stockIngredientExists(ing, this.stock, this.servings, this.recipe.numberOfPeople))
          .map(ing => new Ingredient(
                ing.quantity * (this.servings / this.recipe.numberOfPeople),
                ing.unit,
                ing.type,
                ing.foodType,
                ing.favorite
            )
          ),
          stock: this.stock
        }
      }
    );
    isRealized.afterClosed().subscribe(result =>
      {
        this.handleRealizedResult(result);
      }
    );
  }

  handleRealizedResult(result: any) {
    if (result){
      let errors = 0;
      // Remove ingredients of the inventory in accordance with the recipe
      result.forEach(ing => {
        if (!InventoryHelper.reduceIngredients(this.stock, ing))
        {
          errors++;
        }
        else {
          this.inventoryService.putStockIngredient(this.cook?.id, this.stock.find(s => IngredientComparer.TypeEquals(s, ing)));
        }
      });
      if (errors > 0){
        this.notificationService.error('Error while removing ingredients from the inventory !');
      }
      else {
        this.notificationService.success('ingredients removed from the inventory.');
      }
      this.realized.emit();
    }
  }

  openConfirmAddShoppingListDialog() {
    const toShop = this.dialog.open(
      ConfirmDialogComponent, { data: 'You are gonna add all ingredients to your shopping list.' }
    );
    toShop.afterClosed().subscribe(result =>
      {
        if (result){
          // Remove ingredients of the inventory in accordance with the recipe
          this.recipe.ingredients.forEach(ing => {
            this.shoppingListService.postShoppingListItem(this.cook?.id, new ShoppingListItem(ing, false), true);
            // ShoppingListHelper.addItem(this.cookingTime.shoppingList, new ShoppingListItem(ing, false));
          });
          // this.realized.emit();
        }
      }
    );
  }
  //#endregion
}
