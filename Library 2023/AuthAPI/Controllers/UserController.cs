using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("authenticate")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var response = _userService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();
            return Ok(users);
        }


        //OO: secure afterwards
        //[Authorize]
        [HttpPost]
        public IActionResult Create(User user)
        {
            // OO: Add business logic for check if user exists
            // OO: Encrypt the password
            var users = _userService.Create(user);

            return Ok(users);
        }


        [HttpPost("validate")]
        public IActionResult ValidateToken(string token)
        {
            var userId = _userService.VerifyToken(token);

            if (userId == string.Empty)
                return Unauthorized();

            return Ok(userId);
        }
    }
}