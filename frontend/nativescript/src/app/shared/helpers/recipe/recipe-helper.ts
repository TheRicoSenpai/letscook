import { Realizeable } from "./recipe-realizeable.enum";
import { Ingredient } from "../../../model/ingredient";
import { IngredientComparer } from "../ingredient/ingredient-comparer";
import { QuantityComparer } from "../units/quantity-compare";

export class RecipeHelper {
    static IsRecipeRealizeable(ing: Ingredient,
                               stock: Array<Ingredient>,
                               servings: number,
                               recipeNumberOfPeople: number): Realizeable {
      const stockIng = stock.find((s) => IngredientComparer.TypeEquals(s, ing));
      const stockSimilarIng = stock.filter((s) => s.foodType === ing.foodType);
      if (((!stockIng || stockIng.quantity === 0) && stockSimilarIng.length > 0)) {
        return Realizeable.Similar;
      } else if (stockIng) {
        if (this.stockIngredientExists(ing, stock, servings, recipeNumberOfPeople) || stockIng.quantity === 0) {
          return Realizeable.Full;
        } else {
          return Realizeable.NotEnough;
        }
      } else {
        return Realizeable.None;
      }
    }
    static stockIngredientExists(ing: Ingredient,
                                 stock: Array<Ingredient>,
                                 servings: number,
                                 recipeNumberOfPeople: number): boolean {
        const stockIng = stock.find((s) => IngredientComparer.TypeEquals(s, ing));

        return stockIng !== undefined
          &&
          QuantityComparer.CompareTo(
            stockIng,
            new Ingredient(ing.quantity * (servings / recipeNumberOfPeople),
                            ing.unit,
                            ing.type,
                            ing.foodType, ing.favorite)
          ) >= 0;
      }
}
