using System;
using System.Collections.Generic;
using System.Text;

namespace letscookLibrary
{
    public class ShoppingListItem: BaseEntity
    {
        public bool IsChecked { get; set; }
        public Ingredient Ingredient { get; set; }
    }
}
