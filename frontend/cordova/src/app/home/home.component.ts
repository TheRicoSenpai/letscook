import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe, Ingredient } from '../model';
import { MatDialog } from '@angular/material/dialog';
import { RecipeDialogComponent } from '../recipes/recipe-dialog/recipe-dialog.component';
import { RecipeHelper } from '../core/shared/helpers/recipe/recipe-helper';
import { Realizeable } from '../core/shared/helpers/recipe/recipe-realizeable.enum';
import { IngredientDialogComponent } from '../ingredients/ingredient-dialog/ingredient-dialog.component';
import { QuantityComparer } from '../core/shared/helpers/units/quantity-compare';
import { CookComponent } from '../core/shared/component/cook/cook.component';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../core/shared/service/notification/notification.service';
import { RecipeService } from '../core/shared/service/data/recipe.service';
import { InventoryService } from '../core/shared/service/data/inventory.service';
import { InventoryHelper } from '../core/shared/helpers/inventory/inventory-helper';
import { CooksService } from '../core/shared/service/data/cooks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends CookComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  inventory: Ingredient[];
  fullRecipes: Recipe[] = [];
  partialRecipes: Recipe[] = [];
  constructor(cooksService: CooksService,
              recipeService: RecipeService,
              inventoryService: InventoryService,
              notificationService: NotificationService,
              FB: FormBuilder,
              DIALOG: MatDialog,
              snackBar: MatSnackBar) {
    super(FB, DIALOG, snackBar, cooksService, inventoryService, recipeService, null, notificationService);
  }
  ngOnDestroy(){
    // this.cooksService.needsRefresh.unsubscribe();
    // this.recipeService.needsRefresh.unsubscribe();
    // this.inventoryService.needsRefresh.unsubscribe();
  }

  ngOnInit(): void {
    this.recipeService.needsRefresh.subscribe(() => this.refrehRecipes());
    this.inventoryService.needsRefresh.subscribe(() => this.refrehInventory());
  }

  refrehRecipes() {
    this.recipeService.getAllRecipes()
      .subscribe(
        (result: Recipe[]) => {
          this.recipes = result.sort((a, b) => a.name.localeCompare(b.name));
          this.refreshHome();
        }
    );
  }
  refrehInventory() {
    this.inventoryService.getStock(this.cook?.id)
      .subscribe(
        (result: Ingredient[]) => {
          this.inventory = result;
          this.refreshHome();
        }
    );
  }

  openRecipeDialog(): void {
    const dialogRef = this.dialog.open(RecipeDialogComponent, {
      maxWidth: '70vh',
      data: new Recipe()
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        // push the new recipe to the backend
        this.recipes.push(result);
        this.notificationService.success('Recipe added');
        this.refreshHome();
      }
    });
  }
  openIngredientDialog(): void {
    const dialogRef = this.dialog.open(IngredientDialogComponent, {
      data: new Ingredient()
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        InventoryHelper.addIngredient(this.cook?.inventory , result);
        this.notificationService.success('Article added in the inventory');
        this.refreshHome();
      }
    });
  }

  refreshHome() {
    if (this.recipes && this.recipes.length && this.inventory && this.inventory.length){
      this.fullRecipes = this.recipes.filter(
        r => r.ingredients.every(
          ing => this.cook?.inventory.some(
            i => i.type === ing.type
            && QuantityComparer.CompareTo(i, ing) >= 0
            )
        )
      ).sort((a, b) => a.name.localeCompare(b.name));
      this.partialRecipes = this.recipes.filter(
        r => r.ingredients.every(
          ing => RecipeHelper.IsRecipeRealizeable(ing, this.inventory, r.numberOfPeople, r.numberOfPeople) !== Realizeable.None
        )
              && this.fullRecipes.find(fr => fr.name === r.name) === undefined
      ).sort((a, b) => a.name.localeCompare(b.name));
    }
  }
  recipeRealizedHandler({recipe, result}: { recipe: Recipe; result: any }){
    this.refreshHome();
  }
  refresh() {
    // this.inventory = this.cook?.inventory;
    this.refrehInventory();
    // this.recipes = this.cook?.recipes;
    this.refrehRecipes();
  }
}
