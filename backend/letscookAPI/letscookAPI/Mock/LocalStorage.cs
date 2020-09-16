using letscookLibrary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace letscookAPI.Mock
{
    public static class LocalStorage
    {
        public static List<Cook> data = new List<Cook>()
        {
            new Cook()
            {
                Id = Guid.Parse("d0a85164-4b5e-46a3-b51c-c3edc01d3ca1"),
                Login = "outterheavean@caramail.com",
                Password = "",
                Settings = new Setting()
                {
                    Pseudo = "TheRicoSenpai",
                    PhotoPath = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQu4sIYhAlVIxuP2Hg94LVGOABRki04XFydEg&usqp=CAU",
                    Cache = false,
                    DarkTheme = false,
                    Language = "French"
                },
                Inventory = new List<Ingredient>()
                {
                    new Ingredient() {
                        Id = Guid.NewGuid(),
                        Unit = Unit.Unit.ToString("g"),
                        FoodType =FoodType.Vegetables.ToString("g"),
                        Quantity = 2,
                        Type = "Zuchini",
                        Favorite = true
                    },
                    new Ingredient() {
                        Id = Guid.NewGuid(),
                        Unit = Unit.kg.ToString("g"),
                        FoodType = FoodType.Pasta.ToString("g"),
                        Quantity = 1,
                        Type = "Penne",
                        Favorite = true
                    }
                },
                Recipes = new List<Recipe>()
                {
                    new Recipe() {
                    Id = Guid.Parse("d0a85164-4b5e-46a3-b51c-c3edc01d3cd1"),
                    Name = "Tomatoe Penne",
                    //CookId = "1",
                    NumberOfPeople = 2,
                    Ingredients = new List<Ingredient> {
                        new Ingredient() {
                            Quantity = 2,
                            Unit = Unit.Unit.ToString("g"),
                            Type = "Tomatoe",
                            FoodType = FoodType.Vegetables.ToString("g"),
                            Favorite = true
                        },
                        new Ingredient(){
                            Quantity = 200,
                            Unit = Unit.g.ToString("g"),
                            Type = "Penne",
                            FoodType = FoodType.Pasta.ToString("g"),
                            Favorite = true
                        }
                    },
                    Directions = new List<string> {
                        "Preheat oven to 350 degrees F (175 degrees C).",
                        "Thoroughly mix ground beef, onion, eggs, bread, milk, green bell pepper, salt, sage, and black pepper together in a bowl. Press into a loaf pan. Spread ketchup over the top of the loaf.",
                        "Bake in the preheated oven until no longer pink in the center, about 45 minutes. An instant-read thermometer inserted into the center should read at least 160 degrees F (70 degrees C)."
                    },
                    PreparationTime = 5,
                    CookingTime = 2,
                    Hashtags = new List<string> { RecipeType.Vegetables.ToString("g"), RecipeType.SideDishes.ToString("g") },
                    Favorite = false,
                    PhotoPath = "https://www.wholesomeyum.com/wp-content/uploads/2018/06/wholesomeyum-how-to-make-zucchini-noodles-the-complete-guide-to-making-zoodles-7.jpg"
                }
                , new Recipe()
                  {
                      Id = Guid.Parse("d0a85164-4b5e-46a3-b51c-c3edc01d3cd2"),
                      Name = "Zuchini Penne",
                      //CookId = "1",
                      NumberOfPeople = 2,
                      Ingredients = new List<Ingredient> {
                        new Ingredient(){
                            Quantity = 2,
                            Unit = Unit.Unit.ToString("g"),
                            Type = "Zuchini",
                            FoodType = FoodType.Vegetables.ToString("g"),
                            Favorite = true
                            },
                        new Ingredient(){
                            Quantity = 200,
                            Unit = Unit.g.ToString("g"),
                            Type = "Penne",
                            FoodType = FoodType.Pasta.ToString("g"),
                            Favorite = true }
                       },
                      Directions = new List<string> {
                        "Do this.",
                        "Then do that",
                        "Finally do this !"
                      },
                      PreparationTime = 10,
                      CookingTime = 15,
                      Hashtags = new List<string> { RecipeType.Vegetarian.ToString("g"),  RecipeType.Vegetables.ToString("g"), RecipeType.Pasta.ToString("g") },
                      Favorite = true,
                      PhotoPath = "https://www.saltandlavender.com/wp-content/uploads/2019/07/zucchini-pasta-sauce-1.jpg"
                  }
                },
                ShoppingList = new List<ShoppingListItem>()
                {
                    new ShoppingListItem()
                    {
                        Id = Guid.NewGuid(),
                        IsChecked = false,
                        Ingredient = new Ingredient()
                        {
                            Id = Guid.NewGuid(),
                            Favorite = false,
                            FoodType = FoodType.Pasta.ToString("g"),
                            Quantity = 1,
                            Unit = Unit.kg.ToString("g"),
                            Type = "Penne"
                        }
                    }
                    
                }
            }
        };
    }
}
