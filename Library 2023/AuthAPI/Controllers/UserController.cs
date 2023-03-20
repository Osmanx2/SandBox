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
            // OO: Encrypt the password
            var existingUser = _userService.GetByUserName(user.UserName);

            if ( existingUser is not null)
            {
                return Conflict(new { message = "User with same username already exists!" });
            }

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