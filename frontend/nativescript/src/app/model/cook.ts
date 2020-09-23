import { BaseEntity } from "./base-entity";
import { Recipe } from "./recipe";
import { Settings } from "./settings";
import { ShoppingListItem } from "./shopping-list-item";
import { Ingredient } from "./ingredient";

export class Cook extends BaseEntity {
    login: string;
    password: string;
    inventory: Array<Ingredient>;
    recipes: Array<Recipe>;
    shoppingList: Array<ShoppingListItem>;
    settings: Settings;
}
