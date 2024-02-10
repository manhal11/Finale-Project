using HotelBackend.Data;
using HotelBackend.Models;
using HotelBackend.Models.AuthModels;
using HotelBackend.Models.DtoModels;
using HotelBackend.Util;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;

namespace HotelBackend.Controllers.AuthControllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(IConfiguration configuration, ApplicationDbContext context)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult> Login(LoginRequest loginRequest)
        {
            User? user = _context.Users.Where(user => user.Username.Equals
            (loginRequest.Username)).FirstOrDefault();

            if (user == null ||
                !HashingUtilities.VerifyHashedPassword(user.Password, loginRequest.Password))
            {
                return BadRequest(new ErrorMessageResponse("Wrong username or password. "));
            }

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var token = new JwtSecurityToken
            (
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddDays(60),
                notBefore: DateTime.UtcNow,
                signingCredentials: new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"])),
                    SecurityAlgorithms.HmacSha256)
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return Ok(tokenString);
        }
        [HttpPost]
        [Route("Register")]
        public async Task<ActionResult<User>> Register(RegisterRequest registerRequest)
        {
            User user = new User();
            user.Username = registerRequest.Username;
            user.Password = HashingUtilities.HashPassword(registerRequest.Password);
            user.Email = registerRequest.Email;
            user.Role = UserRoles.User;

            // Verify the user does not exist
            User? existingUsername = _context.Users.Where(u => u.Username.Equals
            (user.Username)).FirstOrDefault();
            if (existingUsername != null)
            {
                return BadRequest(new ErrorMessageResponse("A user with that name already exists."));
            }
            User? existingEmail = _context.Users.Where(u => u.Username.Equals
            (user.Username)).FirstOrDefault();
            if (existingEmail != null)
            {
                return BadRequest(new ErrorMessageResponse("A user with that email already exists."));
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(actionName: "GetUser", controllerName: "Users", new { id = user.Id }, user);
        }
        [HttpGet]
        [Route("GetLoggedUser")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = UserRoles.All)]
        public async Task<ActionResult<User>> GetLoggedUser()
        {
            string? username = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (username == null)
            {
                return BadRequest(new ErrorMessageResponse("Authentication error. "));
            }
            User? user = _context.Users.Where(user => user.Username.Equals
            (username)).FirstOrDefault();

            if (user == null)
            {
                return BadRequest(new ErrorMessageResponse("Authentication error. "));
            }
            return user;
        }
        [HttpPost]
        [Route("ChangePassword")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = UserRoles.All)]
        public async Task<ActionResult<User>> ChangePassword(ChangePasswordRequest changePasswordRequest)
        {
            string? username = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if(username == null)
            {
                return BadRequest(new ErrorMessageResponse("Authentication error. "));
            }
            User? user = _context.Users.Where(user => user.Username.Equals
            (username)).FirstOrDefault();

            if (user == null ||
                !HashingUtilities.VerifyHashedPassword(user.Password, changePasswordRequest.OldPassword))
            {
                return BadRequest(new ErrorMessageResponse("Wrong password. "));
            }
            user.Password = HashingUtilities.HashPassword(changePasswordRequest.NewPassword);
            _context.Entry(user).Property(u => u.Username).IsModified = true;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(user.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
