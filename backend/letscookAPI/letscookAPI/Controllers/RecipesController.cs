using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using letscookLibrary;
using letscookAPI.Mock;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace letscookAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        //static List<Model.Recipe> localStore = new List<Model.Recipe> {
        //        new Model.Recipe() {
        //            Id = Guid.Parse("d0a85164-4b5e-46a3-b51c-c3edc01d3cd1"),
        //            Name = "Tomatoe Penne",
        //            //CookId = "1",
        //            NumberOfPeople = 2,
        //            Ingredients = new Model.Ingredient[] {
        //                new Model.Ingredient(2, Unit.Unit.ToString("g"), "Tomatoe", FoodType.Vegetables.ToString("g"), true),
        //                new Model.Ingredient(200, Unit.g.ToString("g"), "Penne", FoodType.Pasta.ToString("g"), true)
        //            },
        //            Directions = new string[] {
        //                "Preheat oven to 350 degrees F (175 degrees C).",
        //                "Thoroughly mix ground beef, onion, eggs, bread, milk, green bell pepper, salt, sage, and black pepper together in a bowl. Press into a loaf pan. Spread ketchup over the top of the loaf.",
        //                "Bake in the preheated oven until no longer pink in the center, about 45 minutes. An instant-read thermometer inserted into the center should read at least 160 degrees F (70 degrees C)."
        //            },
        //            PreparationTime = 5,
        //            CookingTime = 2,
        //            Hashtags = new string[] { RecipeType.Vegetables.ToString("g"), RecipeType.SideDishes.ToString("g") },
        //            Favorite = false,
        //            PhotoPath = "https://www.wholesomeyum.com/wp-content/uploads/2018/06/wholesomeyum-how-to-make-zucchini-noodles-the-complete-guide-to-making-zoodles-7.jpg"
        //        }
        //        , new Model.Recipe()
        //          {
        //              Id = Guid.Parse("d0a85164-4b5e-46a3-b51c-c3edc01d3cd2"),
        //              Name = "Zuchini Penne",
        //              //CookId = "1",
        //              NumberOfPeople = 2,
        //              Ingredients = new Model.Ingredient[] {
        //                    new Model.Ingredient(2, Unit.Unit.ToString("g"), "Zuchini", FoodType.Vegetables.ToString("g"), true),
        //                    new Model.Ingredient(200, Unit.g.ToString("g"), "Penne", FoodType.Pasta.ToString("g"), true)
        //                },
        //              Directions = new string[] {
        //                "Do this.",
        //                "Then do that",
        //                "Finally do this !"
        //              },
        //              PreparationTime = 10,
        //              CookingTime = 15,
        //              Hashtags = new string[] { RecipeType.Vegetarian.ToString("g"),  RecipeType.Vegetables.ToString("g"), RecipeType.Pasta.ToString("g") },
        //              Favorite = true,
        //              PhotoPath = "https://www.saltandlavender.com/wp-content/uploads/2019/07/zucchini-pasta-sauce-1.jpg"
        //          }
        //    };
       
        // GET: <RecipesController>

        [HttpGet]
        public IEnumerable<Recipe> Get()
        {
            return LocalStorage.data[0].Recipes;
        }

        // GET <RecipesController>/5
        [HttpGet("{id}")]
        public Recipe Get(string id)
        {
            if(Guid.TryParse(id, out Guid idParsed))
            {
                return LocalStorage.data[0].Recipes.FirstOrDefault(ls => ls.Id == idParsed);
            }
            return null;
        }

        // POST <RecipesController>
        [HttpPost]
        public void Post([FromBody] Recipe value)
        {
            LocalStorage.data[0].AddRecipe(value);
        }

        // PUT <RecipesController>/5
        [HttpPut("{id}")]
        public void Put(string id, [FromBody] Recipe value)
        {
            if (Guid.TryParse(id, out Guid idParsed))
            {
                if (LocalStorage.data[0].Recipes.Any(ls => ls.Id == idParsed))
                {
                    Recipe modifiedItem = LocalStorage.data[0].Recipes.First(ls => ls.Id == idParsed);
                    modifiedItem.CookingTime = value.CookingTime;
                    modifiedItem.Directions = value.Directions;
                    modifiedItem.Favorite = value.Favorite;
                    modifiedItem.Hashtags = value.Hashtags;
                    modifiedItem.Name = value.Name;
                    modifiedItem.NumberOfPeople = value.NumberOfPeople;
                    modifiedItem.PhotoPath = value.PhotoPath;
                    modifiedItem.PreparationTime = value.PreparationTime;
                    modifiedItem.Ingredients = value.Ingredients;
                }
            }
    
        }

        // DELETE <RecipesController>/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            if (LocalStorage.data[0].Recipes.Any(ls => ls.Id == Guid.Parse(id)))
                LocalStorage.data[0].Recipes.Remove(LocalStorage.data[0].Recipes.First(ls => ls.Id == Guid.Parse(id)));
        }
    }
}
