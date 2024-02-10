using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HotelBackend.Data;
using HotelBackend.Models.HotelModels;
using HotelBackend.Models.DtoModels;
using HotelBackend.Util;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using System.Data;
using HotelBackend.Models;

namespace HotelBackend.Controllers.DtoControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantRatingsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RestaurantRatingsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/RestaurantRatings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RestaurantRating>>> GetRestaurantRatings()
        {
            return await _context.RestaurantRatings.ToListAsync();
        }

        // GET: api/RestaurantRatings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RestaurantRating>> GetRestaurantRating(int id)
        {
            var restaurantRating = await _context.RestaurantRatings.FindAsync(id);

            if (restaurantRating == null)
            {
                return NotFound();
            }

            return restaurantRating;
        }

        // PUT: api/RestaurantRatings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = UserRoles.All)]
        public async Task<IActionResult> PutRestaurantRating(int id, RestaurantRating restaurantRating)
        {
            User? currentUser = ControllerUtilities.GetCurrentUser(_context, HttpContext);
            if (currentUser == null)
            {
                return BadRequest(new ErrorMessageResponse("Authentication error. "));
            }

            if (currentUser.Role != UserRoles.Administrator &&
                currentUser.Id != restaurantRating.UserId)
            {
                return Unauthorized(new ErrorMessageResponse("You can only modify your own ratings. "));
            }

            restaurantRating.UserId = currentUser.Id;


            // Temporary fast solution
            _context.Entry(restaurantRating).Property(r => r.UserId).IsModified = true;

            _context.Entry(restaurantRating).Property(r => r.Cleanliness).IsModified = true;
            _context.Entry(restaurantRating).Property(r => r.TastyFood).IsModified = true;
            _context.Entry(restaurantRating).Property(r => r.RawMaterialQuality).IsModified = true;
            _context.Entry(restaurantRating).Property(r => r.CrowdnessRating).IsModified = true;
            _context.Entry(restaurantRating).Property(r => r.View).IsModified = true;
            _context.Entry(restaurantRating).Property(r => r.SelectionStatus).IsModified = true;
            _context.Entry(restaurantRating).Property(r => r.Freshness).IsModified = true;
            _context.Entry(restaurantRating).Property(r => r.NumberOfTables).IsModified = true;
            _context.Entry(restaurantRating).Property(r => r.PriceRating).IsModified = true;
            _context.Entry(restaurantRating).Property(r => r.BarRating).IsModified = true;
            _context.Entry(restaurantRating).Property(r => r.MealCountSatisfaction).IsModified = true;
            _context.Entry(restaurantRating).Property(r => r.RichMenu).IsModified = true;
            _context.Entry(restaurantRating).Property(r => r.WaitingTimeRating).IsModified = true;

            if (id != restaurantRating.Id)
            {
                return BadRequest();
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RestaurantRatingExists(id))
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

        // POST: api/RestaurantRatings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = UserRoles.All)]
        public async Task<ActionResult<RestaurantRating>> PostRestaurantRating(RestaurantRating restaurantRating)
        {
            User? currentUser = ControllerUtilities.GetCurrentUser(_context, HttpContext);
            if (currentUser == null)
            {
                return BadRequest(new ErrorMessageResponse("Authentication error. "));
            }

            Hotel? hotel = _context.Hotels.Find(restaurantRating.HotelId);
            if (hotel == null)
            {
                return BadRequest(new ErrorMessageResponse("No such hotel. "));
            }

            restaurantRating.UserId = currentUser.Id;

            _context.RestaurantRatings.Add(restaurantRating);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRestaurantRating", new { id = restaurantRating.Id }, restaurantRating);
        }

        // DELETE: api/RestaurantRatings/5
        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = UserRoles.All)]
        public async Task<IActionResult> DeleteRestaurantRating(int id)
        {
            User? currentUser = ControllerUtilities.GetCurrentUser(_context, HttpContext);
            if (currentUser == null)
            {
                return BadRequest(new ErrorMessageResponse("Authentication error. "));
            }

            var restaurantRating = await _context.RestaurantRatings.FindAsync(id);
            if (restaurantRating == null)
            {
                return NotFound();
            }

            if (currentUser.Role != UserRoles.Administrator &&
                currentUser.Id != restaurantRating.UserId)
            {
                return Unauthorized(new ErrorMessageResponse("You can only delete your own ratings. "));
            }

            _context.RestaurantRatings.Remove(restaurantRating);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RestaurantRatingExists(int id)
        {
            return _context.RestaurantRatings.Any(e => e.Id == id);
        }
    }
}
