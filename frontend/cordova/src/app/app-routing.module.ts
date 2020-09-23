import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { componentFactoryName } from '@angular/compiler';
import { AppComponent } from './app.component';
import { InventoryComponent } from './inventory/inventory.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { SettingsComponent } from './settings/settings.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'settings', component: SettingsComponent},
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
