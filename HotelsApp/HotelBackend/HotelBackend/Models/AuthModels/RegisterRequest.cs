using System.ComponentModel.DataAnnotations;

namespace HotelBackend.Models.AuthModels
{
    public class RegisterRequest
    {
        [Required]
        public string Username { get; set; }
        [Required]
        [StringLength(30, MinimumLength = 8, ErrorMessage = "Password must be between 8 and 30 letters. ")]
        public string Password { get; set; }
        [Required]
        public string Email { get; set; }
    }
}
