import { BaseEntity } from "./base-entity";

export class Ingredient extends BaseEntity {
    quantity: number = undefined;
    unit: string = undefined;
    type: string = undefined;
    foodType: string = undefined;
    favorite: boolean = undefined;

    constructor(quantity?: number, unit?: string, type?: string, foodtype?: string, favorite?: boolean){
        super();
        this.favorite = favorite;
        this.quantity = quantity;
        this.type = type;
        this.foodType = foodtype;
        this.unit = unit;
    }
}
