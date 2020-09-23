import { Ingredient } from "../../../model/ingredient";
import { Unit } from "../../../model/unit.enum";
import { QuantityConverter } from "./unit-converter";

export class QuantityComparer {
    static CompareTo(baseIng: Ingredient, targetIng: Ingredient): number {
        const baseQuantity: number = baseIng.quantity;
        let targetQuantity: number = targetIng.quantity;
        if (baseIng.unit !== targetIng.unit) {
            targetQuantity = QuantityConverter.ConvertTo(targetIng.quantity, Unit[targetIng.unit], Unit[baseIng.unit]);
        }

        const result = baseQuantity - targetQuantity;
        if (result === 0){
            // Means BaseQuantity = TargetQuantity
            return 0;
        } else if (result > 0) {
            // Means BaseQuantity > TargetQuantity
            return 1;
        } else if (result < 0) {
            // Means BaseQuantity < TargetQuantity
            return -1;
        }
    }
}
