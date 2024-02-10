using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

using System.Linq;
using System.Diagnostics;
using HotelBackend.Data;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;

namespace HotelBackend.Models.HotelModels
{
    public class HotelResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }
        public string City { get; set; }

        public double? Rating { get; set; }

        public RestaurantData? RestaurantRatings { get; set; }
        public DinningHallData? DinningHallRatings { get; set; }


        public HotelResponse(Hotel hotel, ApplicationDbContext context)
        {
            this.Id = hotel.Id;
            this.Name = hotel.Name;
            this.Country = hotel.Country;
            this.City = hotel.City;
            this.RestaurantRatings = hotel.HasRestaurant ? new RestaurantData(context.RestaurantRatings.Where(r => r.HotelId == hotel.Id).ToArray(), context) : null;
            this.DinningHallRatings = hotel.HasDinningHall ? new DinningHallData(context.DinningHallRatings.Where(dh => dh.HotelId == hotel.Id).ToArray(), context) : null;

            if ((this.RestaurantRatings?.Rating != null)
                || (this.DinningHallRatings?.Rating != null))
            {
                int count = 0;
                this.Rating = 0;
                if(this.RestaurantRatings?.Rating != null)
                {
                    count += this.RestaurantRatings.RatingsCount;
                    this.Rating += this.RestaurantRatings.Rating * this.RestaurantRatings.RatingsCount;
                }
                if (this.DinningHallRatings?.Rating != null)
                {
                    count += this.DinningHallRatings.RatingsCount;
                    this.Rating += this.DinningHallRatings.Rating * this.DinningHallRatings.RatingsCount;
                }
                if (count > 0)
                    this.Rating /= count;
            } else
            {
                this.Rating = null;
            }
        }

        public class RestaurantData
        {
            public double? Cleanliness { get; set; }
            public double? TastyFood { get; set; }
            public double? RawMaterialQuality { get; set; }
            public double? CrowdnessRating { get; set; }
            public double? View { get; set; }
            public double? SelectionStatus { get; set; }
            public double? Freshness { get; set; }
            public double? NumberOfTables { get; set; }
            public double? PriceRating { get; set; }
            public double? BarRating { get; set; }
            public double? MealCountSatisfaction { get; set; }
            public double? RichMenu { get; set; }
            public double? WaitingTimeRating { get; set; }
            public CommentData[] Comments { get; set; }
            public double? Rating { get; set; }

            public int RatingsCount { get; set; }
            public RestaurantData(RestaurantRating[] ratings, ApplicationDbContext context)
            {
                this.Cleanliness = (from r in ratings select r.Cleanliness).Average();
                this.TastyFood = (from r in ratings select r.TastyFood).Average();
                this.RawMaterialQuality = (from r in ratings select r.RawMaterialQuality).Average();
                this.CrowdnessRating = (from r in ratings select r.CrowdnessRating).Average();
                this.View = (from r in ratings select r.View).Average();
                this.SelectionStatus = (from r in ratings select r.SelectionStatus).Average();
                this.Freshness = (from r in ratings select r.Freshness).Average();
                this.NumberOfTables = (from r in ratings select r.NumberOfTables).Average();
                this.PriceRating = (from r in ratings select r.PriceRating).Average();
                this.BarRating = (from r in ratings select r.BarRating).Average();
                this.MealCountSatisfaction = (from r in ratings select r.MealCountSatisfaction).Average();
                this.RichMenu = (from r in ratings select r.RichMenu).Average();
                this.WaitingTimeRating = (from r in ratings select r.WaitingTimeRating).Average();

                this.Comments = ratings
                    .Select(r => new CommentData(r.UserId, context.Users.Find(r.UserId).Username, r.Comment, r.DateAdded))
                    .Where(r => (r.Comment != null && context.Users.Find(r.UserId) != null))
                    .ToArray();

                this.Rating = CalculateRatingData();
            }
            public double? CalculateRatingData()
            {
                // Calculate total rating data
                var ratingValues = new List<double>();
                if (!(this.Cleanliness == null)) ratingValues.Add((double)this.Cleanliness);
                if (!(this.TastyFood == null)) ratingValues.Add((double)this.TastyFood);
                if (!(this.RawMaterialQuality == null)) ratingValues.Add((double)this.RawMaterialQuality);
                if (!(this.CrowdnessRating == null)) ratingValues.Add((double)this.CrowdnessRating);
                if (!(this.View == null)) ratingValues.Add((double)this.View);
                if (!(this.SelectionStatus == null)) ratingValues.Add((double)this.SelectionStatus);
                if (!(this.Freshness == null)) ratingValues.Add((double)this.Freshness);
                if (!(this.NumberOfTables == null)) ratingValues.Add((double)this.NumberOfTables);
                if (!(this.PriceRating == null)) ratingValues.Add((double)this.PriceRating);
                if (!(this.BarRating == null)) ratingValues.Add((double)this.BarRating);
                if (!(this.MealCountSatisfaction == null)) ratingValues.Add((double)this.MealCountSatisfaction);
                if (!(this.RichMenu == null)) ratingValues.Add((double)this.RichMenu);
                if (!(this.WaitingTimeRating == null)) ratingValues.Add((double)this.WaitingTimeRating);

                this.RatingsCount = ratingValues.Count;
                if (ratingValues.Count > 0)
                    return ratingValues.Average();
                return null;
            }
        }
        public class DinningHallData
        {
            public double? Cleanliness { get; set; }
            public double? TastyFood { get; set; }
            public double? RawMaterialQuality { get; set; }
            public double? CrowdnessRating { get; set; }
            public double? View { get; set; }
            public double? SelectionStatus { get; set; }
            public double? Freshness { get; set; }
            public double? NumberOfTables { get; set; }
            public CommentData[] Comments { get; set; }

            public double? Rating { get; set; }

            public int RatingsCount { get; set; }
            public DinningHallData(DinningHallRating[] ratings, ApplicationDbContext context)
            {
                this.Cleanliness = (from r in ratings select r.Cleanliness).Average();
                this.TastyFood = (from r in ratings select r.TastyFood).Average();
                this.RawMaterialQuality = (from r in ratings select r.RawMaterialQuality).Average();
                this.CrowdnessRating = (from r in ratings select r.CrowdnessRating).Average();
                this.View = (from r in ratings select r.View).Average();
                this.SelectionStatus = (from r in ratings select r.SelectionStatus).Average();
                this.Freshness = (from r in ratings select r.Freshness).Average();
                this.NumberOfTables = (from r in ratings select r.NumberOfTables).Average();
                
                this.Comments = ratings
                    .Select(r => new CommentData(r.UserId, context.Users.Find(r.UserId).Username, r.Comment, r.DateAdded))
                    .Where(r => (r.Comment != null && context.Users.Find(r.UserId) != null))
                    .ToArray();

                this.Rating = CalculateRatingData();
            }

            public double? CalculateRatingData()
            {
                // Calculate total rating data
                var ratingValues = new List<double>();
                if (!(this.Cleanliness == null)) ratingValues.Add((double)this.Cleanliness);
                if (!(this.TastyFood == null)) ratingValues.Add((double)this.TastyFood);
                if (!(this.RawMaterialQuality == null)) ratingValues.Add((double)this.RawMaterialQuality);
                if (!(this.CrowdnessRating == null)) ratingValues.Add((double)this.CrowdnessRating);
                if (!(this.View == null)) ratingValues.Add((double)this.View);
                if (!(this.SelectionStatus == null)) ratingValues.Add((double)this.SelectionStatus);
                if (!(this.Freshness == null)) ratingValues.Add((double)this.Freshness);
                if (!(this.NumberOfTables == null)) ratingValues.Add((double)this.NumberOfTables);

                this.RatingsCount = ratingValues.Count;
                if (this.RatingsCount > 0)
                    return ratingValues.Average();
                return null;
            }
        }
        public class CommentData
        {
            public int UserId { get; set; }
            public string UserName { get; set; }
            public string Comment { get; set; }
            public DateTime DateCommented { get; set; }

            public CommentData(int userId, string username, string comment, DateTime dateCommented)
            {
                this.UserId = userId;
                this.UserName = username;
                this.Comment = comment;
                this.DateCommented = dateCommented;
            }
        }
    }
}
