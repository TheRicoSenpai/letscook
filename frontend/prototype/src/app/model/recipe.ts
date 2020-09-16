import { Ingredient } from './ingredient';
import { NameEntity } from './name-entity';
import { map } from 'rxjs/operators';
import { BaseEntity } from './base-entity';

export class Recipe extends BaseEntity { //extends NameEntity {
    public name: string;
    public numberOfPeople: number = 0;
    public preparationTime: number = 0;
    public cookingTime: number = 0;
    public favorite: boolean = false;
    public photoPath: string = undefined;
    public ingredients: Ingredient[] = [];
    public directions: string[] = [];
    public hashtags: string[] = [];

    /**
     *
     */
    // constructor(dataJson?: any) {
    //     super();
    //     if (dataJson){
    //         this.id = dataJson.id;
    //         this.name = dataJson.name;
    //         this.numberOfPeople = dataJson.numberOfPeople;
    //         this.preparationTime = dataJson.preparationTime;
    //         this.cookingTime = dataJson.cookingTime;
    //         this.favorite = dataJson.favorite;
    //         this.photoPath = dataJson.photoPath;
    //         this.ingredients = dataJson.ingredients.map((value: Ingredient) => value);
    //         this.directions = dataJson.directions;
    //         this.hashtags = dataJson.hashtags;
    //         console.log(this);
    //     }
    // }
}
