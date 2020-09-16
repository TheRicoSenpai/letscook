import { Ingredient } from './ingredient';
import { CookEntity } from './cook-entity';
import { QuantityConverter } from '../core/shared/helpers/units/unit-converter';
import { QuantityComparer } from '../core/shared/helpers/units/quantity-compare';
import { Unit } from './unit.enum';

export class Inventory extends CookEntity {
    public stock: Ingredient[];

    constructor(id: string, cookId: string, stock: Ingredient[]) {
      super();
      this.id = id;
      this.cookId = cookId;
      this.stock = stock;
    }

    // addIngredient(ing: Ingredient): boolean{
    //   if (this.stock.some(i => i.type === ing.type && i.foodType === ing.foodType && i.unit === ing.unit)){
    //     this.stock.find(
    //       i => i.type === ing.type
    //       && i.foodType === ing.foodType
    //       && i.unit === ing.unit).quantity += ing.quantity;
    //     return true;
    //   }
    //   else{
    //     this.stock.push(ing);
    //     return true;
    //   }
    //   return false;
    // }
    // removeIngredient(ing: Ingredient): boolean{
    //   if (ing && this.stock.some(i => i.type === ing.type && i.foodType === ing.foodType)){
    //     this.stock.splice(this.stock.indexOf(ing), 1);
    //     return true;
    //   }
    //   return false;
    // }
    // reduceIngredients(ing: Ingredient): boolean{
    //   if (ing && this.stock.some(i => i.type === ing.type && i.foodType === ing.foodType)){
    //     const stockIng = this.stock.find(s => s.type === ing.type && s.foodType === ing.foodType);
    //     // First check if reducing will be equal to 0 or less (but should never be the case !!!)
    //     if (QuantityComparer.CompareTo(stockIng, ing) <= 0){
    //       stockIng.quantity = 0;
    //       return true;
    //     }

    //     if (stockIng.unit === ing.unit){
    //       stockIng.quantity -= ing.quantity;
    //       stockIng.quantity = +stockIng.quantity.toPrecision(3);
    //       return true;
    //     }
    //     else {
    //       const convertedIngQuantity = QuantityConverter.ConvertTo(ing.quantity, Unit[ing.unit], Unit[stockIng.unit]);
    //       stockIng.quantity -= convertedIngQuantity;
    //       stockIng.quantity = +stockIng.quantity.toPrecision(3);
    //       return true;
    //     }
    //   }
    //   return false;
    // }
}
