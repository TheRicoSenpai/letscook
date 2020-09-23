import {Ingredient} from '../../../../model/ingredient';
import { UnitDisplay } from '../units/unit-display';
export class IngredientHelper {
    public static displayIngredient(ing: Ingredient, factor?: number): string {
        if (!ing){
            return '';
        }
        return (ing.quantity * (factor ? factor : 1)).toFixed(2).toString() + UnitDisplay.display(ing.unit) + ' ' + ing.type;
    }
}
