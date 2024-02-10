using HotelBackend.Models.DtoModels;
using HotelBackend.Models.HotelModels;
using Microsoft.EntityFrameworkCore;

namespace HotelBackend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Hotel>()
        //           .HasOptional(h => h.RestaurantRatings)
        //           .WithMany()
        //           .WillCascadeOnDelete(true);
        //    base.OnModelCreating(modelBuilder);
        //    modelBuilder.Entity<Hotel>()
        //           .HasOptional(h => h.DinningHallRatings)
        //           .WithMany()
        //           .WillCascadeOnDelete(true);
        //    base.OnModelCreating(modelBuilder);
        //}

        public DbSet<User> Users { get; set; }
        public DbSet<Hotel> Hotels { get; set; }
        public DbSet<RestaurantRating> RestaurantRatings { get; set; }
        public DbSet<DinningHallRating> DinningHallRatings { get; set; }
    }
}
