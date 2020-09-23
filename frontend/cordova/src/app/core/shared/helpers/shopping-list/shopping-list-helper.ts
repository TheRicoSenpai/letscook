import { ShoppingListItem } from '../../../../model/shopping-list-item';
import { IngredientComparer } from '../ingredient/ingredient-comparer';
import { QuantityConverter } from '../units/unit-converter';
import { Unit } from 'src/app/model';

export class ShoppingListHelper {
    static addItem(shoppingList: ShoppingListItem[], item: ShoppingListItem): void{
        if (shoppingList.some(sli =>  IngredientComparer.TypeEquals(sli.ingredient, item.ingredient)))
        {
            const ingToUpdate = shoppingList.find(sli =>  IngredientComparer.TypeEquals(sli.ingredient, item.ingredient)).ingredient;
            if (ingToUpdate.unit === item.ingredient.unit)
            {
                ingToUpdate.quantity += item.ingredient.quantity;
            }
            else
            {
                ingToUpdate.quantity = QuantityConverter.ConvertTo(item.ingredient.quantity,
                                                                    Unit[item.ingredient.unit],
                                                                    Unit[ingToUpdate.unit]);
            }
        }
        else {
            shoppingList.push(item);
        }
    }

    static removeItem(shoppingList: ShoppingListItem[], item: ShoppingListItem): void{
        shoppingList.splice(shoppingList.indexOf(item), 1);
    }
}
