using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HotelBackend.Data;
using HotelBackend.Models.HotelModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using HotelBackend.Util;
using HotelBackend.Models.DtoModels;
using HotelBackend.Models;
using Microsoft.Data.SqlClient;

namespace HotelBackend.Controllers.HotelControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public HotelsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Hotels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HotelResponse>>> GetHotels(
            string? name,
            string? country,
            string? city,
            bool? hasRestaurant,
            bool? hasDinningHall,
            float? minRating,
            float? maxRating,
            string? sortBy
            )
        {
            IQueryable<Hotel> hotels = _context.Hotels;
            // Filtering
            if (name != null)
            {
                hotels = hotels.Where(h => EF.Functions.Like(h.Name, "%" + name + "%"));
            }
            if (country != null)
            {
                hotels = hotels.Where(h => EF.Functions.Like(h.Country, "%" + country + "%"));
            }
            if (city != null)
            {
                hotels = hotels.Where(h => EF.Functions.Like(h.City, "%" + city + "%"));
            }
            if (hasRestaurant != null)
            {
                hotels = hotels.Where(h => h.HasRestaurant == hasRestaurant);
            }
            if (hasDinningHall != null)
            {
                hotels = hotels.Where(h => h.HasDinningHall == hasDinningHall);
            }

            // Created to prevent double connections to the database
            Hotel[] hotelArray = hotels.ToArray();
            var hotelResponses = hotelArray.Select(h => new HotelResponse(h, _context));

            // More Filtering
            if (minRating != null)
            {
                hotelResponses = hotelResponses.Where(h => h.Rating == null || h.Rating >= minRating);
            }
            if (maxRating != null)
            {
                hotelResponses = hotelResponses.Where(h => h.Rating == null || h.Rating <= maxRating);
            }
            // Sorting
            switch (sortBy)
            {
                case "name":
                    hotelResponses = hotelResponses.OrderBy(h => h.Name);
                    break;
                case "name_desc":
                    hotelResponses = hotelResponses.OrderByDescending(h => h.Name);
                    break;
                case "restaurant_rating":
                    hotelResponses = hotelResponses
                        .OrderBy(h => h.RestaurantRatings != null)
                        .ThenBy(h => h.RestaurantRatings?.Rating);
                    break;
                case "restaurant_rating_desc":
                    hotelResponses = hotelResponses
                        .OrderByDescending(h => h.RestaurantRatings?.Rating)
                        .ThenByDescending(h => h.RestaurantRatings != null);
                    break;
                case "dinning_hall_rating":
                    hotelResponses = hotelResponses
                        .OrderBy(h => h.DinningHallRatings != null)
                        .ThenBy(h => h.DinningHallRatings?.Rating);
                    break;
                case "dinning_hall_rating_desc":
                    hotelResponses = hotelResponses
                        .OrderByDescending(h => h.DinningHallRatings?.Rating)
                        .ThenByDescending(h => h.DinningHallRatings != null);
                    break;
                default:
                    //hotelResponses = hotelResponses.OrderBy(h => h.Id);
                    break;
            }

            return hotelResponses.ToList();
        }

        // GET: api/Hotels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HotelResponse>> GetHotel(int id)
        {
            var hotel = await _context.Hotels.FindAsync(id);

            if (hotel == null)
            {
                return NotFound();
            }

            HotelResponse hotelResponse = new HotelResponse(hotel, _context);

            return hotelResponse;
        }

        // PUT: api/Hotels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = UserRoles.Administrator)]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHotel(int id, Hotel hotel)
        {
            if (id != hotel.Id)
            {
                return BadRequest();
            }

            _context.Entry(hotel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HotelExists(id))
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

        // POST: api/Hotels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = UserRoles.Administrator)]
        [HttpPost]
        public async Task<ActionResult<Hotel>> PostHotel(Hotel hotel)
        {
            // Verify the user does not exist
            Hotel? existingHotelByName = _context.Hotels.Where(h => h.Name.Equals
            (hotel.Name)).FirstOrDefault();
            if (existingHotelByName != null)
            {
                return BadRequest(new ErrorMessageResponse("A hotel with that name already exists."));
            }

            _context.Hotels.Add(hotel);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (HotelExists(hotel.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetHotel", new { id = hotel.Id }, hotel);
        }

        // DELETE: api/Hotels/5
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = UserRoles.Administrator)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHotel(int id)
        {
            var hotel = await _context.Hotels.FindAsync(id);
            if (hotel == null)
            {
                return NotFound();
            }

            RestaurantRating[] restaurantRatings = _context.RestaurantRatings.Where(r => r.HotelId == hotel.Id).ToArray();
            _context.RestaurantRatings.RemoveRange(restaurantRatings);

            DinningHallRating[] dinningHallRatings = _context.DinningHallRatings.Where(dhr => dhr.HotelId == hotel.Id).ToArray();
            _context.DinningHallRatings.RemoveRange(dinningHallRatings);

            _context.Hotels.Remove(hotel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HotelExists(int id)
        {
            return _context.Hotels.Any(e => e.Id == id);
        }
    }
}
