using HotelBackend.Data;
using HotelBackend.Models.DtoModels;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace HotelBackend.Util
{
    public static class ControllerUtilities
    {
        public static User? GetCurrentUser(ApplicationDbContext context, HttpContext httpContext)
        {
            string? username = httpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (username == null)
            {
                return null;
            }
            return context.Users.Where(user => user.Username.Equals
            (username)).FirstOrDefault();
        }
    }
}
