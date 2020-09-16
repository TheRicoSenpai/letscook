import { Component, OnInit, Input, OnChanges  } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FoodType, Unit, Ingredient } from '../model';
import { FOODS } from '../Mock/foods';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { CookComponent } from '../core/shared/component/cook/cook.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CooksService } from '../core/shared/service/data/cooks.service';

interface FoodGroup{
  type: string;
  names: string[];
}
export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit, OnChanges {
  foods = Object.keys(FoodType)
    .filter(ft => ft)
    .map(ft => ({type: ft, names: FOODS.filter(f => f.type === ft).map(f => f.name) }))
    .filter(f => f.names.length > 0);
  units = Object.keys(Unit)
    .map(key => Unit[key]);
  foodTypes = Object.keys(FoodType)
    .map(key => FoodType[key]);
  hasFoodType = false;
  unitsOptions: Observable<string[]>;
  foodsOptions: Observable<FoodGroup[]>;

  // @Input() form: FormGroup;

  form: FormGroup;
  @Input() name: FormControl;
  @Input() quantity: FormControl;
  @Input() unit: FormControl;
  @Input() foodType: FormControl;
  @Input() stock: Ingredient[];

  constructor(private FB: FormBuilder, DIALOG: MatDialog, snackBar: MatSnackBar) {
    // super(FB, DIALOG, snackBar);
  }
  ngOnChanges(){
    // this.form = this.fb.group({
    this.form = this.FB.group({
      name: this.name,
      quantity: this.quantity,
      unit: this.unit,
      foodType: this.foodType
    });
    this.hasFoodType = this.foodType ? true : false;
    this.unitsOptions = this.unit?.valueChanges
      .pipe(
        startWith(''),
        map((value: string) => this. _filterUnitGroup(value))
      );
    this.foodsOptions = this.name?.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterFoodGroup(value))
    );
    this.name?.valueChanges.subscribe((value) => this.refreshRecipeType(value));
  }

  ngOnInit(): void {
  }

  private _filterUnitGroup(value: string): string[] {
    if (value) {
      return _filter(this.units, value);
    }
    return this.units;
  }

  private _filterFoodGroup(value: string): FoodGroup[] {
    if (this.stock){
      if (value) {
        return this.foods
          .map(f => (
            {
              type: f.type,
              names: _filter(f.names, value)
              .filter(food => this.stock.some(s => s.foodType === f.type && s.type === food && s.quantity > 0))
            }));
      }
      return this.foods
        .map(f => (
          {
            type: f.type,
            names: f.names
            .filter(food => this.stock.some(s => s.foodType === f.type && s.type === food && s.quantity > 0))
          }));
    }
    else
    {
      if (value) {
        return this.foods
        .map(food => ({type: food.type, names: _filter(food.names, value)}))
        .filter(food => food.names.length > 0);
      }
      return this.foods;
    }
  }

  refreshRecipeType(value: string){
    this.hasFoodType = FOODS.some(f => f.name === value);
    if (this.hasFoodType){
      this.foodType.setValue(FOODS.find(f => f.name === value).type);
    }
  }
}
