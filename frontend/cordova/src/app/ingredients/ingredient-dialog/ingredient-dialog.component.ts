import { Component, OnInit, Inject } from '@angular/core';
import { FoodType, Ingredient } from 'src/app/model';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';

import { FOODS } from 'src/app/Mock/foods';
import { DialogComponent } from '../../core/shared/component/dialog/dialog.component';

@Component({
  selector: 'app-ingredient-dialog',
  templateUrl: './ingredient-dialog.component.html',
  styleUrls: ['./ingredient-dialog.component.css']
})
export class IngredientDialogComponent extends DialogComponent implements OnInit {
  foodTypes = Object.keys(FoodType).map(key => FoodType[key]);
  form: FormGroup;
  color = 'primary';
  constructor(fb: FormBuilder,
              dialog: MatDialog,
              dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: Ingredient) {
      super(fb,
        dialog,
        dialogRef,
        data);
      console.log('data input', this.data);
      this.form = this.fb.group({
          name: this.data.type,
          quantity: this.data.quantity,
          unit: this.data.unit,
          foodType: this.data.foodType
      });
    }

  ngOnInit(): void {
  }

  saveChanges(){
      this.data.type = this.form.get('name').value;
      this.data.quantity = this.form.get('quantity').value;
      this.data.unit = this.form.get('unit').value;
      this.data.foodType = this.form.get('foodType').value;
      console.log('data output', this.form);
      if (!FOODS.some(f => f.name === this.data.type && f.type === this.data.foodType)) {
        FOODS.push({name: this.data.type, type: this.foodTypes.find(ft => ft === this.data.foodType)});
      }
    }
}
