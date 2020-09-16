import {Ingredient} from './ingredient';
import { BaseEntity } from './base-entity';
export class ShoppingListItem extends BaseEntity {
    isChecked: boolean;
    ingredient: Ingredient;

    constructor(ingredient?: Ingredient, ischecked?: boolean) {
        super();
        this.ingredient = ingredient;
        this.isChecked = ischecked;
    }
}
