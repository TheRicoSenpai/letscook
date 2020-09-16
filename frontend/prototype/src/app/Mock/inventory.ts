import {Ingredient, Food, Unit, FoodType, Inventory} from '../model';
import {FOODS} from './foods';

// export const INVENTORY: Inventory = new Inventory(
//         '',
//         '',
//         [
//             new Ingredient(0, Unit.Unit, FOODS[0].name, FoodType.Vegetables, false),
//             new Ingredient(5, Unit.Unit, FOODS[1].name, FoodType.Vegetables, false),
//             new Ingredient(1, Unit.Unit, FOODS[4].name, FoodType.Fruits, false),
//             new Ingredient(1, Unit.kg, FOODS[2].name, FoodType.Pasta, false),
//         ]
// );

export const INVENTORY: Ingredient[] =
    [
        new Ingredient(0, Unit.Unit, FOODS[0].name, FoodType.Vegetables, false),
        new Ingredient(5, Unit.Unit, FOODS[1].name, FoodType.Vegetables, false),
        new Ingredient(1, Unit.Unit, FOODS[4].name, FoodType.Fruits, false),
        new Ingredient(1, Unit.kg, FOODS[2].name, FoodType.Pasta, false),
    ]
;
