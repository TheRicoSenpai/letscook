import { Ingredient } from "./ingredient";
import { BaseEntity } from "./base-entity";

export class Recipe extends BaseEntity {
    name: string;
    numberOfPeople: number = 0;
    preparationTime: number = 0;
    cookingTime: number = 0;
    favorite: boolean = false;
    photoPath: string = undefined;
    ingredients: Array<Ingredient> = [];
    directions: Array<string> = [];
    hashtags: Array<string> = [];
}
