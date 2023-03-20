using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using WebApi.Models;
using MongoDB.Driver;
using AuthAPI;

namespace WebApi.Services
{
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
        IEnumerable<User> GetAll();
        User GetByUserName(string userName);
        User GetById(string id);
        User Create(User user);
        string VerifyToken(string token);
    }

    public class UserService : IUserService
    {
        private readonly IMongoCollection<User> _users;

        private readonly IAuthDatabaseSettings _appSettings;

        public UserService(IAuthDatabaseSettings settings)
        {
            _appSettings = settings;
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _users = database.GetCollection<User>(settings.UsersCollectionName);
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            var user = _users.Find(x => x.UserName == model.Username).FirstOrDefault();

            // return null if user not found
            if (user == null) return null;

            // This is not best practice as user passsword should be encrypted at rest for example bcrypt
            if (!model.Password.Equals(user.Password)) return null;

            // authentication successful so generate jwt token
            var token = generateJwtToken(user);

            return new AuthenticateResponse(user, token);
        }

        public IEnumerable<User> GetAll()
        {
            return _users.Find(_=>true).ToEnumerable();
        }

        public User GetByUserName(string userName)
        {
            return _users.Find(x => x.UserName == userName).FirstOrDefault();
        }

        public User GetById(string id)
        {
            return _users.Find(x => x.Id == id).FirstOrDefault();
        }

        public List<User> Get() =>
            _users.Find(u => true).ToList();

        public User Get(string id) =>
            _users.Find<User>(u => u.Id == id).FirstOrDefault();

        public User Create(User user)
        {
            _users.InsertOne(user);
            return user;
        }

        public void Update(string id, User userIn) =>
            _users.ReplaceOne(u => u.Id == id, userIn);

        public void Remove(User userin) =>
            _users.DeleteOne(u => u.Id == userin.Id);

        public void Remove(string id) => 
            _users.DeleteOne(u => u.Id == id);

        // helper methods
        private string generateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Constants.TokenSecret);
            
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public string VerifyToken(string token)
        {
            var userId = string.Empty;

            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(Constants.TokenSecret);
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                if (validatedToken == null)
                    return string.Empty;

                var jwtToken = (JwtSecurityToken)validatedToken;
                userId = jwtToken.Claims.First(x => x.Type == "id").Value;
            }
            catch
            {
                return string.Empty;
            }

            return userId;
        }
    }
}