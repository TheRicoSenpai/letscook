import {FOODS} from './foods';
import {FoodType} from '../model/food-type.enum';
import {Unit} from '../model/unit.enum';
import { Ingredient, ShoppingList } from '../model';
import { ShoppingListItem } from '../model/shopping-list-item';

// export const SHOPPINGLIST: ShoppingList = new ShoppingList(
//         '',
//         '',
//         [
//             new ShoppingListItem(
//                 new Ingredient(1, Unit.kg, FOODS[2].name, FoodType.Pasta, false),
//                 true
//             ),
//             new ShoppingListItem(
//                 new Ingredient(1, Unit.kg, FOODS[3].name, FoodType.Pasta, false),
//                 false
//             )
//         ]
// );

export const SHOPPINGLIST: ShoppingListItem[] =
    [
        new ShoppingListItem(
            new Ingredient(1, Unit.kg, FOODS[2].name, FoodType.Pasta, false),
            true
        ),
        new ShoppingListItem(
            new Ingredient(1, Unit.kg, FOODS[3].name, FoodType.Pasta, false),
            false
        )
    ]
;