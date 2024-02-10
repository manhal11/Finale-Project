

using System.ComponentModel.DataAnnotations;

namespace HotelBackend.Models.AuthModels
{
    public class LoginRequest
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
