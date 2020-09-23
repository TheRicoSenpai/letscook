import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { FoodType, Ingredient, Recipe, Unit } from "../model";
import { InventoryService } from "../shared/service/data/inventory.service";
import { RecipeService } from "../shared/service/data/recipe.service";

@Component({
    selector: "Browse",
    templateUrl: "./browse.component.html"
})
export class BrowseComponent implements OnInit {

    recipes: Array<Recipe>;
    inventory: Array<Ingredient>;
    
    constructor() { // private recipeService: RecipeService, private inventoryService: InventoryService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        // this.recipeService.needsRefresh.subscribe(() => this.refrehRecipes());
        // this.inventoryService.needsRefresh.subscribe(() => this.refrehInventory());
        this.inventory = new Array<Ingredient>();
        this.inventory.push(new Ingredient(1, Unit.kg, "Penne", FoodType.Pasta, true));
        this.inventory.push(new Ingredient(2, Unit.Unit, "Tomatoe", FoodType.Vegetables, false));
    }
    
    refrehRecipes() {
        // this.recipeService.getAllRecipes()
        //     .subscribe(
        //     (result: Array<Recipe>) => {
        //         this.recipes = result.sort((a, b) => a.name.localeCompare(b.name));
        //         // this.refreshHome();
        //     }
        // );
    }
    refrehInventory() {
        // this.inventoryService.getStock("d0a85164-4b5e-46a3-b51c-c3edc01d3ca1")
        //     .subscribe(
        //     (result: Array<Ingredient>) => {
        //         this.inventory = result;
        //         // this.refreshHome();
        //     }
        // );
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
