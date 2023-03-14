using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HealthController : ControllerBase
    {
        private readonly IMongoDatabase _database;
		private readonly IWebHostEnvironment _Environment;
		private readonly IAuthDatabaseSettings _settings;

        public HealthController(IAuthDatabaseSettings settings, IWebHostEnvironment env)
        {
            _settings = settings;
            var client = new MongoClient(settings.ConnectionString);
            _database = client.GetDatabase(settings.DatabaseName);
            _Environment = env;
        }

        [HttpGet]
        public IActionResult Health()
        {
            try
            {
                _database.RunCommandAsync((Command<BsonDocument>)"{ping:1}")
                    .Wait();
            }
            catch (System.Exception ex)
            {
                return NotFound($"No connection to DB at address {_settings.ConnectionString}. Details: {ex.Message.ToString()}");
            }
            
            return Ok($"Up and running on {_Environment.EnvironmentName}");
        }
    }
}