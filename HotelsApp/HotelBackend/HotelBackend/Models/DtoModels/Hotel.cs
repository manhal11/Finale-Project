using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using HotelBackend.Data;

namespace HotelBackend.Models.HotelModels
{
    public class Hotel
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Country { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public bool HasRestaurant { get; set; }
        [Required]
        public bool HasDinningHall { get; set; }
    }
}
