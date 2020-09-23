import { Ingredient } from "../../../model/ingredient";
import { QuantityComparer } from "../units/quantity-compare";
import { QuantityConverter } from "../units/unit-converter";
import { Unit } from "../../../model/unit.enum";

export class InventoryHelper {

  static addIngredient(inventory: Array<Ingredient>, ing: Ingredient): boolean {
      if (inventory.some((i) => i.type === ing.type && i.foodType === ing.foodType && i.unit === ing.unit)) {
        inventory.find(
          (i) => i.type === ing.type
          && i.foodType === ing.foodType
          && i.unit === ing.unit).quantity += ing.quantity;

        return true;
      } else {
        inventory.push(ing);

        return true;
      }
    }
  static removeIngredient(inventory: Array<Ingredient>, ing: Ingredient): boolean {
    if (ing && inventory.some((i) => i.type === ing.type && i.foodType === ing.foodType)) {
      inventory.splice(inventory.indexOf(ing), 1);

      return true;
    }

    return false;
  }
  static reduceIngredients(inventory: Array<Ingredient>, ing: Ingredient): boolean {
    if (ing && inventory.some(i => i.type === ing.type && i.foodType === ing.foodType)) {
      const stockIng = inventory.find(s => s.type === ing.type && s.foodType === ing.foodType);
      // First check if reducing will be equal to 0 or less (but should never be the case !!!)
      if (QuantityComparer.CompareTo(stockIng, ing) <= 0) {
        stockIng.quantity = 0;

        return true;
      }

      if (stockIng.unit === ing.unit) {
        stockIng.quantity -= ing.quantity;
        stockIng.quantity = +stockIng.quantity.toPrecision(3);

        return true;
      } else {
        const convertedIngQuantity = QuantityConverter.ConvertTo(ing.quantity, Unit[ing.unit], Unit[stockIng.unit]);
        stockIng.quantity -= convertedIngQuantity;
        stockIng.quantity = +stockIng.quantity.toPrecision(3);

        return true;
      }
    }

    return false;
  }
}
