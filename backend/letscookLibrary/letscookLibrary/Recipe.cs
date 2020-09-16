using System;
using System.Collections.Generic;
using System.Text;

namespace letscookLibrary
{
    public class Recipe: BaseEntity
    {
        public string Name { get; set; }
        public int NumberOfPeople { get; set; }
        public int PreparationTime { get; set; }
        public int CookingTime { get; set; }
        public bool Favorite { get; set; }
        public string PhotoPath{ get; set; }
        public List<Ingredient> Ingredients { get; set; }
        public List<string> Directions { get; set; }
        public List<string> Hashtags { get; set; }
    }
}
