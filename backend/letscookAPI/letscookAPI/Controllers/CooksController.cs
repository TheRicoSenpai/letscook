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
    public class CooksController : ControllerBase
    {
        // GET: api/<CookController>
        [HttpGet]
        public IEnumerable<Cook> Get()
        {
            return LocalStorage.data;
        }

        // GET api/<CookController>/5
        [HttpGet("{id}")]
        public Cook Get(string id)
        {
            if (Guid.TryParse(id, out Guid idParsed) && ControllerHelper.CookExists(idParsed))
            {
                return LocalStorage.data.FirstOrDefault(cook => cook.Id == idParsed);
            }
            return null;
        }

        // POST api/<CookController>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        // PUT api/<CookController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        // DELETE api/<CookController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
