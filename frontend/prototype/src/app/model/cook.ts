import { BaseEntity } from './base-entity';
import { Inventory } from './inventory';
import { Recipe } from './recipe';
import { ShoppingList } from './shopping-list';
import { Settings } from './settings';
import { ShoppingListItem } from './shopping-list-item';
import { Ingredient } from './ingredient';

export class Cook extends BaseEntity {
    login: string;
    password: string;
    inventory: Ingredient[];
    recipes: Recipe[];
    shoppingList: ShoppingListItem[];
    settings: Settings;
}
