import { Component, OnInit } from '@angular/core';
import { Recipe, RecipeType, Ingredient } from '../model';
import { RecipeDialogComponent} from './recipe-dialog/recipe-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CookComponent } from '../core/shared/component/cook/cook.component';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../core/shared/service/notification/notification.service';
import { RecipeService } from '../core/shared/service/data/recipe.service';
import { Observable } from 'rxjs';
import { InventoryService } from '../core/shared/service/data/inventory.service';
import { CooksService } from '../core/shared/service/data/cooks.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent extends CookComponent implements OnInit {
  recipes: Recipe[];
  inventory: Ingredient[];

  constructor(cooksService: CooksService,
              recipeService: RecipeService,
              inventoryService: InventoryService,
              FB: FormBuilder,
              DIALOG: MatDialog,
              snackBar: MatSnackBar,
              private notificationService: NotificationService) {

    super(FB, DIALOG, snackBar, cooksService, inventoryService, recipeService);
  }

  ngOnInit(): void {
    // this.recipes = this.cook?.cookRecipes.sort((a, b) => a.name.localeCompare(b.name));
    this.recipeService.needsRefresh.subscribe(() => this.refrehRecipes());
    this.inventoryService.needsRefresh.subscribe(() => this.refreshInventory());
    // this.recipes = this.cook?.recipes;
    // this.refrehRecipes();
    // this.inventory = this.cook?.inventory;
    // this.refreshInventory();
  }

  refrehRecipes() {
    this.recipeService.getAllRecipes()
      .subscribe(
        (result: Recipe[]) => {
          this.recipes = result.sort((a, b) => a.name.localeCompare(b.name));
        }
    );
  }
  refreshInventory() {
    this.inventoryService.getStock(this.cook?.id)
      .subscribe(
        (result: Ingredient[]) => {
          this.inventory = result;
        }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RecipeDialogComponent, {
      width: '70vh',
      data: new Recipe()
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        // this.cook.cookRecipes.push(result);
        this.recipeService.postRecipe(result);
        // this.recipes.sort((a, b) => a.name.localeCompare(b.name));
      }
    });
  }

  refresh() {
    this.refrehRecipes();
    this.refreshInventory();
  }

}
