import { Ingredient } from "./ingredient";
import { CookEntity } from "./cook-entity";

export class Inventory extends CookEntity {
    stock: Array<Ingredient>;

    constructor(id: string, cookId: string, stock: Array<Ingredient>) {
      super();
      this.id = id;
      this.cookId = cookId;
      this.stock = stock;
    }
}
