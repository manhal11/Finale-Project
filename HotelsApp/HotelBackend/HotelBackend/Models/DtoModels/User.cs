using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace HotelBackend.Models.DtoModels
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        [JsonIgnore]
        public string Password { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Role { get; set; }
    }
}
