import { CookEntity } from './cook-entity';
import { Ingredient } from './ingredient';
import {ShoppingListItem} from './shopping-list-item';
export class ShoppingList extends CookEntity {
    public listOfItems: ShoppingListItem[];

    constructor(id?: string, cookId?: string, listofitems?: ShoppingListItem[]) {
        super();
        this.listOfItems = listofitems;
    }

    // addItem(item: ShoppingListItem): void{
    //     this.listOfItems.push(item);
    // }

    // removeItem(item: ShoppingListItem): void{
    //     this.listOfItems.splice(this.listOfItems.indexOf(item), 1);
    // }
}
