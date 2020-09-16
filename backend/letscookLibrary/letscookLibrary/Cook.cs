using System;
using System.Collections.Generic;
using System.Text;

namespace letscookLibrary
{
    public class Cook: BaseEntity
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public IList<Ingredient> Inventory { get; set; }
        public IList<Recipe> Recipes { get; set; }
        public IList<ShoppingListItem> ShoppingList { get; set; }
        public Setting Settings { get; set; }

        public void AddRecipe(Recipe value)
        {
            value.Id = Guid.NewGuid();
            Recipes.Add(value);
        }
    }
}
