using System;
using System.Collections.Generic;
using System.Text;

namespace letscookLibrary
{
    public class Ingredient: BaseEntity
    {
        public double Quantity { get; set; }
        public string Unit { get; set; }
        public string Type { get; set; }
        public string FoodType { get; set; }
        public bool Favorite { get; set; }
    }
}
