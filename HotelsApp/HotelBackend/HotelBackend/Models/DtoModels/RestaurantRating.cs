using HotelBackend.Models.DtoModels;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HotelBackend.Models.HotelModels
{
    public class RestaurantRating
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [ForeignKey("Hotel")]
        public int HotelId { get; set; }
        [Required]
        [ForeignKey("User")]
        public int UserId { get; set; }
        public DateTime DateAdded { get; set; }
        [Range(1, 10)]
        public int? Cleanliness { get; set; }
        [Range(1, 10)]
        public int? TastyFood { get; set; }
        [Range(1, 10)]
        public int? RawMaterialQuality { get; set; }
        [Range(1, 10)]
        public int? CrowdnessRating { get; set; }
        [Range(1, 10)]
        public int? View { get; set; }
        [Range(1, 10)]
        public int? SelectionStatus { get; set; }
        [Range(1, 10)]
        public int? Freshness { get; set; }
        [Range(1, 10)]
        public int? NumberOfTables { get; set; }
        [Range(1, 10)]
        public int? PriceRating { get; set; }
        [Range(1, 10)]
        public int? BarRating { get; set; }
        [Range(1, 10)]
        public int? MealCountSatisfaction { get; set; }
        [Range(1, 10)]
        public int? RichMenu { get; set; }
        [Range(1, 10)]
        public int? WaitingTimeRating { get; set; }
        [StringLength(200, ErrorMessage = "Comment can not be more than 200 characters. ")]
        public string? Comment { get; set; }
        public RestaurantRating()
        {
            this.DateAdded = DateTime.UtcNow;
        }
    }
}
