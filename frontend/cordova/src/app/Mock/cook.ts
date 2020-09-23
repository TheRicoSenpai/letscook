import { Cook } from '../model/cook';
import { INVENTORY } from './inventory';
import { RECIPES } from './recipes';
import { SHOPPINGLIST} from './shopping-list';
import { SETTINGS } from './settings';
export const COOK: Cook = {
    id: 'd0a85164-4b5e-46a3-b51c-c3edc01d3ca1',
    login: 'carpediem@yolo.com',
    password: 'yolo123',
    inventory: INVENTORY,
    recipes: RECIPES,
    shoppingList: SHOPPINGLIST,
    settings: SETTINGS
};
