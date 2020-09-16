using letscookAPI.Mock;
using letscookLibrary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace letscookAPI.Helper
{
    public static class ControllerHelper
    {
        #region "Cook"
        public static bool CookExists(Guid cookId)
        {
            return LocalStorage.data.Any(c => c.Id == cookId);
        }
        #endregion

        #region "Shopping list"
        public static IList<ShoppingListItem> GetShoppingList(Guid cookId)
        {
            return LocalStorage.data.First(c => c.Id == cookId)
                    .ShoppingList;
        }

        public static bool ShoppingListItemExists(Guid cookId, Guid id)
        {
            return GetShoppingList(cookId).Any(sli => sli.Id == id);
        }

        public static ShoppingListItem GetShoppingListItem(Guid cookId, Guid id)
        {
            return LocalStorage.data.First(c => c.Id == cookId)
                    .ShoppingList.First(sli => sli.Id == id);
        }
        #endregion


        #region "Inventory"
        public static IList<Ingredient> GetInventory(Guid cookId)
        {
            return LocalStorage.data.First(c => c.Id == cookId).Inventory;
        }

        public static bool IngredientExists(Guid cookId, Guid id)
        {
            return GetInventory(cookId).Any(ing => ing.Id == id);
        }

        public static bool TypeEquals(Ingredient srcIng, Ingredient trgIng) {
            return srcIng.Type == trgIng.Type && srcIng.FoodType == trgIng.FoodType;
        }
        #endregion
}
}
