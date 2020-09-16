using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using letscookAPI.Mock;
using letscookLibrary;
using Microsoft.AspNetCore.Mvc;
using letscookAPI.Helper;
using Microsoft.CodeAnalysis.FlowAnalysis;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace letscookAPI.Controllers
{
    //[Route("[controller]")]
    [Route("shopping-list")]
    [ApiController]
    public class ShoppingListController : ControllerBase
    {
        // GET: api/<ShoppingListController>
        [HttpGet("{cookId}")]
        public IEnumerable<ShoppingListItem> Get(string cookId)
        {
            if (Guid.TryParse(cookId, out Guid _cookId) && ControllerHelper.CookExists(_cookId))
            {
                return ControllerHelper.GetShoppingList(_cookId);
            }
            return null;
        }

        // GET api/<ShoppingListController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST api/<ShoppingListController>
        [HttpPost("{cookId}")]
        public void Post(string cookId, [FromBody] ShoppingListItem value)
        {
            if (Guid.TryParse(cookId, out Guid _cookId) && ControllerHelper.CookExists(_cookId))
            {
                if (ControllerHelper.GetShoppingList(_cookId).Any(sli => ControllerHelper.TypeEquals(sli.Ingredient, value.Ingredient)))
                {
                    // Ingredient exists in the shopping list => update
                    Ingredient ingToUpdate = ControllerHelper.GetShoppingList(_cookId).First(sli => ControllerHelper.TypeEquals(sli.Ingredient, value.Ingredient)).Ingredient;
                    if (ingToUpdate.Unit != value.Ingredient.Unit)
                    {
                        ingToUpdate.Quantity += UnitHelper.ConvertTo(value.Ingredient.Quantity, Enum.Parse<Unit>(value.Ingredient.Unit), Enum.Parse<Unit>(ingToUpdate.Unit));
                    }
                    else
                    {
                        ingToUpdate.Quantity += value.Ingredient.Quantity;
                    }
                }
                else
                {
                    // New ingredient top add => create
                    value.Id = Guid.NewGuid();
                    ControllerHelper.GetShoppingList(_cookId).Add(value);
                }
            }
        }

        // PUT api/<ShoppingListController>/5
        [HttpPut("{cookId}/{id}")]
        public void Put(string cookId, string id, [FromBody] ShoppingListItem value)
        {
            if (Guid.TryParse(cookId, out Guid _cookId) && Guid.TryParse(id, out Guid _id) && 
                ControllerHelper.CookExists(_cookId) && ControllerHelper.ShoppingListItemExists(_cookId, _id))
            {
                ControllerHelper.GetShoppingListItem(_cookId, _id).Ingredient = value.Ingredient;
                ControllerHelper.GetShoppingListItem(_cookId, _id).IsChecked = value.IsChecked;
            }
        }

        [HttpPut("{cookId}")]
        public void Put(string cookId, [FromBody] IList<ShoppingListItem> value)
        {
            if (Guid.TryParse(cookId, out Guid _cookId) && ControllerHelper.CookExists(_cookId))
            {
                LocalStorage.data.First(cook => cook.Id == _cookId).ShoppingList = value;
            }
        }

        // DELETE api/<ShoppingListController>/5
        [HttpDelete("{cookId}/{id}")]
        public void Delete(string cookId, string id)
        {
            if (Guid.TryParse(cookId, out Guid _cookId) && Guid.TryParse(id, out Guid _id) &&
                ControllerHelper.CookExists(_cookId) && ControllerHelper.ShoppingListItemExists(_cookId, _id))
            {
                LocalStorage.data.First(c => c.Id == _cookId).ShoppingList.Remove(ControllerHelper.GetShoppingListItem(_cookId, _id));
            }
        }

        
    }
}
