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
    public class SettingsController : ControllerBase
    {
        // GET: api/<SettingsController>
        [HttpGet]
        public Setting Get()
        {
            return LocalStorage.data[0].Settings;
        }

        // GET api/<SettingsController>/5
        [HttpGet("{cookId}")]
        public Setting Get(string cookId)
        {
            if (Guid.TryParse(cookId, out Guid idParsed) && ControllerHelper.CookExists(idParsed))
            {
                return LocalStorage.data.First(Cook => Cook.Id == idParsed).Settings;
            }
            return null;
        }

        // POST api/<SettingsController>
        //[HttpPost]
        //public void Post([FromBody] Setting value)
        //{
        //}

        // PUT api/<SettingsController>/5
        [HttpPut("{cookId}")]
        public void Put(string cookId, [FromBody] Setting value)
        {
            if (Guid.TryParse(cookId, out Guid idParsed) && ControllerHelper.CookExists(idParsed))
            {
                LocalStorage.data.First(Cook => Cook.Id == idParsed).Settings = value;
            }
        }

        // DELETE api/<SettingsController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
