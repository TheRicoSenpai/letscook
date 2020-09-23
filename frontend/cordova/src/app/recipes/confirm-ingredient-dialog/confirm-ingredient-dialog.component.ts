import { Component, OnInit, Inject } from '@angular/core';
import { DialogComponent } from 'src/app/core/shared/component/dialog/dialog.component';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ingredient } from 'src/app/model';

@Component({
  selector: 'app-confirm-ingredient-dialog',
  templateUrl: './confirm-ingredient-dialog.component.html',
  styleUrls: ['./confirm-ingredient-dialog.component.css']
})
export class ConfirmIngredientDialogComponent extends DialogComponent implements OnInit {
  form: FormGroup;
  forms: FormGroup[] = [];
  color: 'primary';
  detailVisible = false;
  newData: Ingredient[] = [];
  stock: Ingredient[];

  constructor(fb: FormBuilder,
              dialog: MatDialog,
              dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: { ingredients: Ingredient[], stock: Ingredient[] }) {
      super(fb, dialog, dialogRef, data);
    }

  ngOnInit(): void {
    this.stock = this.data.stock;
    this.data.ingredients?.forEach(ing => {
      this.newData.push(new Ingredient(
        ing.quantity,
        ing.unit,
        ing.type,
        ing.foodType)
      );
      this.forms.push(this.initFormGroup(ing));
      this.trackChanges(this.forms[this.forms.length - 1]);
    });
    this.form = this.initFormGroup();
  }

  initFormGroup(ing?: Ingredient): FormGroup{
    return this.fb.group({
      name: ing?.type ?? '',
      quantity: ing?.quantity ?? undefined,
      unit: ing?.unit ?? '',
      foodType: ing?.foodType ?? ''
    });
  }
  trackChanges(form: FormGroup){
    form.controls.name.valueChanges.subscribe((value) => {
      this.refreshOutputData();
    });
    form.controls.quantity.valueChanges.subscribe((value) => {
      this.refreshOutputData();
    });
    form.controls.unit.valueChanges.subscribe((value) => {
      this.refreshOutputData();
    });
    form.controls.foodType.valueChanges.subscribe((value) => {
      this.refreshOutputData();
    });
  }
  refreshOutputData() {
    this.newData = this.forms.map(f => new Ingredient(
      f.controls.quantity.value,
      f.controls.unit.value,
      f.controls.name.value,
      f.controls.foodType.value)
    );
  }

  addItem() {
    this.forms.push(this.form);
    this.newData.push(new Ingredient(
      this.form.controls.quantity.value,
      this.form.controls.unit.value,
      this.form.controls.name.value,
      this.form.controls.foodType.value)
    );
    this.trackChanges(this.forms[this.forms.length - 1]);
    this.form = this.initFormGroup();
    this.detailVisible = false;
  }

  cancelItem(){
    this.form = this.initFormGroup();
    this.detailVisible = false;
  }

  removeItem(index: number) {
    this.forms.splice(index, 1);
    this.refreshOutputData();
  }

  saveChanges(){
    console.log(this.newData);
    console.log(this.forms);
  }

}
