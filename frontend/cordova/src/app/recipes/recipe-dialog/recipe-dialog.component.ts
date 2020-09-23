import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
// import { Recipe } from '../../model/recipe';
import { RecipeType } from '../../model/recipe-type.enum';
import { Ingredient, Recipe, Unit } from '../../model';
import {IngredientDialogComponent} from '../../ingredients/ingredient-dialog/ingredient-dialog.component';
import { DialogComponent } from '../../core/shared/component/dialog/dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IngredientHelper } from '../../core/shared/helpers/ingredient/ingredient-helper';
import { RecipeService } from '../../core/shared/service/data/recipe.service';
import { IngredientComparer } from '../../core/shared/helpers/ingredient/ingredient-comparer';
import { QuantityConverter } from 'src/app/core/shared/helpers/units/unit-converter';

@Component({
  selector: 'app-recipe-dialog',
  templateUrl: './recipe-dialog.component.html',
  styleUrls: ['./recipe-dialog.component.css']
})
export class RecipeDialogComponent extends DialogComponent implements OnInit {
  recipeTypes: string[] = Object.keys(RecipeType).map(key => RecipeType[key]);
  currentData: Recipe;
  form: FormGroup;
  color = 'primary';

  constructor(private recipesService: RecipeService,
              fb: FormBuilder,
              dialog: MatDialog,
              dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
      super(fb, dialog, dialogRef, data);
      const oData = this.data;
      this.recipesService.getRecipe(this.data.id).subscribe(result => {
        if  (result)
        {
          this.currentData = result;
          this.form = this.fb.group({
            name: this.currentData.name,
            cookingTime : this.currentData.cookingTime,
            preparationTime : this.currentData.preparationTime,
            numberOfPeople : this.currentData.numberOfPeople,
            favorite : this.currentData.favorite,
            photoPath : this.currentData.photoPath,
            ingredients : this.fb.array(this.currentData.ingredients),
            directions : this.fb.array(this.currentData.directions),
            hashtags : this.fb.array(this.currentData.hashtags)
          });
        }
      });
      this.currentData = {...oData};
      this.currentData.ingredients = this.currentData.ingredients
        .map(i => new Ingredient(i.quantity, i.unit, i.type, i.foodType, i.favorite));

      this.form = this.fb.group({
        name: this.currentData.name,
        cookingTime : this.currentData.cookingTime,
        preparationTime : this.currentData.preparationTime,
        numberOfPeople : this.currentData.numberOfPeople,
        favorite : this.currentData.favorite,
        photoPath : this.currentData.photoPath,
        ingredients : this.fb.array(this.currentData.ingredients),
        directions : this.fb.array(this.currentData.directions),
        hashtags : this.fb.array(this.currentData.hashtags)
      });
    }

  ngOnInit() {
  }

  displayIngredient(ing: Ingredient){
    return IngredientHelper.displayIngredient(ing);
  }

  saveChanges() {
    this.currentData.name = this.form.controls.name.value;
    this.currentData.cookingTime  = this.form.controls.cookingTime.value;
    this.currentData.preparationTime = this.form.controls.preparationTime.value;
    this.currentData.numberOfPeople = this.form.controls.numberOfPeople.value;
    this.currentData.favorite = this.form.controls.favorite.value;
    this.currentData.photoPath = this.form.controls.photoPath.value;
    this.currentData.ingredients = this.form.controls.ingredients.value;
    this.currentData.directions = this.form.controls.directions.value;
    this.currentData.hashtags = this.form.controls.hashtags.value;
  }
//#region Ingredients
  openUpdateIngredient(ing: Ingredient){
    const dialogRef = this.dialog.open(IngredientDialogComponent, {
      data: ing
      });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result){
    //   }
    // });
  }

  openInsertIngredient(){
    const dialogRef = this.dialog.open(IngredientDialogComponent, {
      data: new Ingredient()
      });
    dialogRef.afterClosed().subscribe((result: Ingredient) => {
      if (result){
        if (this.form.controls.ingredients.value.some(ing => IngredientComparer.TypeEquals(ing, result))){
          const ingToUpdate: Ingredient = this.form.controls.ingredients.value.find(ing => IngredientComparer.TypeEquals(ing, result));
          if (result.unit === ingToUpdate.unit)
          {
            ingToUpdate.quantity += result.quantity;
          }
          else
          {
            ingToUpdate.quantity += QuantityConverter.ConvertTo(result.quantity, Unit[result.unit], Unit[ingToUpdate.unit]);
          }
        }
        else
        {
          this.form.controls.ingredients.value.push(result);
        }
      }
    });
  }
  removeIngredient(idx: number){
    this.form.controls.ingredients.value.splice(idx, 1);
  }
//#endregion

//#region  Directions
  saveDirection(idx: number, drt: string){
    this.form.controls.directions.value[idx] = drt;
  }

  addDirection(){
    this.form.controls.directions.value.push('');
  }

  removeDirection(idx: number){
    this.form.controls.directions.value.splice(idx, 1);
  }
//#endregion

//#region Favorite
  isFavorite(){
    this.currentData.favorite = !this.currentData.favorite;
  }
//#endregion

//#region Hashtags

//#endregion
}
