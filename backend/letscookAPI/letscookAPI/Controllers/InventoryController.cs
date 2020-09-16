using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using letscookAPI.Helper;
using letscookAPI.Mock;
using letscookLibrary;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace letscookAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        // GET: api/<InventoryController>
        [HttpGet("{cookId}")]
        public IEnumerable<Ingredient> Get(string cookId)
        {
            if (Guid.TryParse(cookId, out Guid _cookId) && ControllerHelper.CookExists(_cookId))
            {
                return ControllerHelper.GetInventory(_cookId);
            }
            return null;
        }

        // GET api/<InventoryController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST api/<InventoryController>
        [HttpPost("{cookId}")]
        public void Post(string cookId, [FromBody] Ingredient value)
        {
            if (Guid.TryParse(cookId, out Guid _cookId) && ControllerHelper.CookExists(_cookId))
            {
                if (ControllerHelper.GetInventory(_cookId).Any(ing => ControllerHelper.TypeEquals(ing, value)))
                {
                    // Ingredient exists in the inventory => update
                    Ingredient ingToUpdate = ControllerHelper.GetInventory(_cookId).First(ing => ControllerHelper.TypeEquals(ing, value));
                    if (ingToUpdate.Unit != value.Unit)
                    {
                        ingToUpdate.Quantity += UnitHelper.ConvertTo(value.Quantity, Enum.Parse<Unit>(value.Unit), Enum.Parse<Unit>(ingToUpdate.Unit));
                    }
                    else
                    {
                        ingToUpdate.Quantity += value.Quantity;
                    }
                }
                else
                {
                    // New ingredient top add => create
                    ControllerHelper.GetInventory(_cookId).Add(value);
                }
            }
         }

        // PUT api/<InventoryController>/5
        [HttpPut("{cookId}")]
        public void Put(string cookId, [FromBody] Ingredient value)
        {
            if (Guid.TryParse(cookId, out Guid _cookId) && ControllerHelper.CookExists(_cookId) && ControllerHelper.IngredientExists(_cookId, value.Id))
            {
                UpdateInventoryIngredient(ControllerHelper.GetInventory(_cookId).First(ing => ing.Id == value.Id), value);
            }
        }

        private void UpdateInventoryIngredient(Ingredient backendIng, Ingredient frontendIng)
        {
            backendIng.Quantity = frontendIng.Quantity;
            backendIng.Unit = frontendIng.Unit;
            backendIng.Type = frontendIng.Type;
            backendIng.FoodType = frontendIng.FoodType;
            backendIng.Favorite = frontendIng.Favorite;
        }

        // DELETE api/<InventoryController>/5
        [HttpDelete("{cookId}/{id}")]
        public void Delete(string cookId, string id)
        {
            if (Guid.TryParse(cookId, out Guid _cookId) && Guid.TryParse(id, out Guid _id) && ControllerHelper.CookExists(_cookId) && ControllerHelper.IngredientExists(_cookId, _id))
            {
                ControllerHelper.GetInventory(_cookId).Remove(ControllerHelper.GetInventory(_cookId).First(Ingredient => Ingredient.Id == _id));
            }
        }
    }
}
