using System.ComponentModel.DataAnnotations;

namespace HotelBackend.Models.AuthModels
{
    public class ChangePasswordRequest
    {
        [Required]
        public string OldPassword { get; set; }
        [Required]
        [StringLength(30, MinimumLength = 8, ErrorMessage = "Password must be at least 8 characters. ")]
        public string NewPassword { get; set; }
    }
}
