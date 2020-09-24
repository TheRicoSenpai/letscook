import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
// import { Recipe } from '../../model/recipe';
import { RecipeType } from '../../model/recipe-type.enum';
import { Ingredient, Recipe, Unit } from '../../model';
import {IngredientDialogComponent} from '../../ingredients/ingredient-dialog/ingredient-dialog.component';
import { DialogComponent } from '../../core/shared/component/dialog/dialog.component';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IngredientHelper } from '../../core/shared/helpers/ingredient/ingredient-helper';
import { RecipeService } from '../../core/shared/service/data/recipe.service';
import { IngredientComparer } from '../../core/shared/helpers/ingredient/ingredient-comparer';
import { QuantityConverter } from 'src/app/core/shared/helpers/units/unit-converter';
interface IngredientItemDetail {
  ingredient: Ingredient;
  detailVisible: boolean;
}
@Component({
  selector: 'app-recipe-dialog',
  templateUrl: './recipe-dialog.component.html',
  styleUrls: ['./recipe-dialog.component.css']
})
export class RecipeDialogComponent extends DialogComponent implements OnInit {
  recipeTypes: string[] = Object.keys(RecipeType).map(key => RecipeType[key]);
  currentData: Recipe;
  form: FormGroup;
  ingFormArray: FormArray;
  ingForm: FormGroup;
  itemDetail: IngredientItemDetail = {
    ingredient: new Ingredient(),
    detailVisible: false
  };
  lastIIDVisible: IngredientItemDetail;
  newDirectionVisible: boolean;
  newDirection = this.fb.control('');
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
          this.ingFormArray = this.fb.array(this.currentData.ingredients.map(value => ({ ingredient : value, detailVisible: false }) ));
          this.form = this.fb.group({
            name: this.currentData.name,
            cookingTime : this.currentData.cookingTime,
            preparationTime : this.currentData.preparationTime,
            numberOfPeople : this.currentData.numberOfPeople,
            favorite : this.currentData.favorite,
            photoPath : this.currentData.photoPath,
            ingredients : this.ingFormArray,
            directions : this.fb.array(this.currentData.directions),
            hashtags : this.fb.array(this.currentData.hashtags)
          });
        }
      });
      this.currentData = {...oData};
      this.currentData.ingredients = this.currentData.ingredients
        .map(i => new Ingredient(i.quantity, i.unit, i.type, i.foodType, i.favorite));
      this.ingFormArray =  this.fb.array(this.currentData.ingredients.map(value => ({ ingredient : value, detailVisible: false }) ));
      this.form = this.fb.group({
        name: this.currentData.name,
        cookingTime : this.currentData.cookingTime,
        preparationTime : this.currentData.preparationTime,
        numberOfPeople : this.currentData.numberOfPeople,
        favorite : this.currentData.favorite,
        photoPath : this.currentData.photoPath,
        ingredients : this.ingFormArray,
        directions : this.fb.array(this.currentData.directions),
        hashtags : this.fb.array(this.currentData.hashtags)
      });
      this.initIngregientFormGroup();
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
    this.currentData.ingredients = this.form.controls.ingredients.value.map(value => value.ingredient);
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
  modifyItem(iid: IngredientItemDetail) {
    console.log('iid :' + iid);
    this.setDetailVisible(iid, true);
  }
  addItem(iid: IngredientItemDetail) {
    const newIngredient = new Ingredient(
      this.ingForm.controls.quantity.value,
      this.ingForm.controls.unit.value,
      this.ingForm.controls.name.value,
      this.ingForm.controls.foodType.value,
      false);
    this.ingFormArray.push(this.fb.control(({ingredient: newIngredient, detailVisible: false })));
    this.setDetailVisible(iid, false);
  }
  updateItem(iid: IngredientItemDetail){
    iid.ingredient.quantity = this.ingForm.controls.quantity.value;
    iid.ingredient.unit = this.ingForm.controls.unit.value;
    iid.ingredient.type = this.ingForm.controls.name.value;
    iid.ingredient.foodType = this.ingForm.controls.foodType.value;
    this.setDetailVisible(iid, false);
  }
  cancelItem(iid: IngredientItemDetail) {
    this.setDetailVisible(iid, false);
  }
  setDetailVisible(iid: IngredientItemDetail, isVisible: boolean){
    if (this.lastIIDVisible){
      this.lastIIDVisible.detailVisible = false;
    }
    iid.detailVisible = isVisible;
    this.initIngregientFormGroup(isVisible ? iid : undefined);
    this.lastIIDVisible = iid;
  }
  initIngregientFormGroup(iid?: IngredientItemDetail){
    this.ingForm = this.fb.group({
      name: iid?.ingredient.type ?? '',
      quantity: iid?.ingredient.quantity ?? undefined,
      unit: iid?.ingredient.unit ?? '',
      foodType: iid?.ingredient.foodType ?? ''
    });
  }
//#endregion

//#region  Directions
  saveDirection(idx: number, drt: string){
    this.form.controls.directions.value[idx] = drt;
  }

  addDirection(){
    this.form.controls.directions.value.push(this.newDirection.value);
    this.newDirectionVisible = false,
    this.newDirection.reset();
  }

  removeDirection(idx: number){
    this.form.controls.directions.value.splice(idx, 1);
  }
  cancelNewDirection() {
    this.newDirectionVisible = false,
    this.newDirection.reset();
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
