import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmIngredientDialogComponent } from './confirm-ingredient-dialog.component';

describe('ConfirmIngredientDialogComponent', () => {
  let component: ConfirmIngredientDialogComponent;
  let fixture: ComponentFixture<ConfirmIngredientDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmIngredientDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmIngredientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
