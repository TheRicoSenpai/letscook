import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideMenuComponent } from './core/shared/component/side-menu/side-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './core/shared/shared.module';
import { InventoryComponent } from './inventory/inventory.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { SettingsComponent } from './settings/settings.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RecipeDialogComponent } from './recipes/recipe-dialog/recipe-dialog.component';
import { IngredientDialogComponent } from './ingredients/ingredient-dialog/ingredient-dialog.component';
import { ThemingService } from './core/shared/service/theme/theming.service';
import { NotificationService } from './core/shared/service/notification/notification.service';
import { ConfirmIngredientDialogComponent } from './recipes/confirm-ingredient-dialog/confirm-ingredient-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    HomeComponent,
    InventoryComponent,
    ShoppingListComponent,
    RecipesComponent,
    SettingsComponent,
    RecipeDetailComponent,
    IngredientsComponent,
    RecipeDialogComponent,
    IngredientDialogComponent,
    ConfirmIngredientDialogComponent
  ],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule
  ],
  providers: [ThemingService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
