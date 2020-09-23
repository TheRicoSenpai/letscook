import { CookEntity } from "./cook-entity";
import { Ingredient } from "./ingredient";
import {ShoppingListItem} from "./shopping-list-item";
export class ShoppingList extends CookEntity {
    listOfItems: Array<ShoppingListItem>;

    constructor(id?: string, cookId?: string, listofitems?: Array<ShoppingListItem>) {
        super();
        this.listOfItems = listofitems;
    }
}
