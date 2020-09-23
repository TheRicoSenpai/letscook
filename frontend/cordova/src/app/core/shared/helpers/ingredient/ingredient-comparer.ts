import {Ingredient} from '../../../../model/ingredient';
export class IngredientComparer{
    static TypeEquals(srcIng: Ingredient, trgIng: Ingredient): boolean{
        return srcIng.type === trgIng.type && srcIng.foodType === trgIng.foodType;
    }
}
