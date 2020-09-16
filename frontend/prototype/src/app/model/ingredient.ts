import { UnitDisplay } from '../core/shared/helpers/units/unit-display';
import { BaseEntity } from './base-entity';

export class Ingredient extends BaseEntity {
    public quantity: number = undefined;
    public unit: string = undefined;
    public type: string = undefined;
    public foodType: string = undefined;
    public favorite: boolean = undefined;

    constructor(quantity?: number, unit?: string, type?: string, foodtype?: string, favorite?: boolean){
        super();
        this.favorite = favorite;
        this.quantity = quantity;
        this.type = type;
        this.foodType = foodtype;
        this.unit = unit;
    }
}
