using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HotelBackend.Data;
using HotelBackend.Models.HotelModels;
using HotelBackend.Models.AuthModels;
using HotelBackend.Models.DtoModels;
using HotelBackend.Util;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using System.Data;
using HotelBackend.Models;

namespace HotelBackend.Controllers.DtoControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DinningHallRatingsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DinningHallRatingsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/DinningHallRatings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DinningHallRating>>> GetDinningHallRatings()
        {
            return await _context.DinningHallRatings.ToListAsync();
        }

        // GET: api/DinningHallRatings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DinningHallRating>> GetDinningHallRating(int id)
        {
            var dinningHallRating = await _context.DinningHallRatings.FindAsync(id);

            if (dinningHallRating == null)
            {
                return NotFound();
            }

            return dinningHallRating;
        }

        // PUT: api/DinningHallRatings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = UserRoles.All)]
        public async Task<IActionResult> PutDinningHallRating(int id, DinningHallRating dinningHallRating)
        {
            User? currentUser = ControllerUtilities.GetCurrentUser(_context, HttpContext);
            if(currentUser == null)
            {
                return BadRequest(new ErrorMessageResponse("Authentication error. "));
            }

            if (currentUser.Role != UserRoles.Administrator &&
                currentUser.Id != dinningHallRating.UserId)
            {
                return Unauthorized(new ErrorMessageResponse("You can only modify your own ratings. "));
            }

            dinningHallRating.UserId = currentUser.Id;


            // Temporary fast solution
            _context.Entry(dinningHallRating).Property(r => r.UserId).IsModified = true;

            _context.Entry(dinningHallRating).Property(r => r.Cleanliness).IsModified = true;
            _context.Entry(dinningHallRating).Property(r => r.TastyFood).IsModified = true;
            _context.Entry(dinningHallRating).Property(r => r.RawMaterialQuality).IsModified = true;
            _context.Entry(dinningHallRating).Property(r => r.CrowdnessRating).IsModified = true;
            _context.Entry(dinningHallRating).Property(r => r.View).IsModified = true;
            _context.Entry(dinningHallRating).Property(r => r.SelectionStatus).IsModified = true;
            _context.Entry(dinningHallRating).Property(r => r.Freshness).IsModified = true;
            _context.Entry(dinningHallRating).Property(r => r.NumberOfTables).IsModified = true;

            if (id != dinningHallRating.Id)
            {
                return BadRequest();
            }
            
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DinningHallRatingExists(id))
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

        // POST: api/DinningHallRatings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = UserRoles.All)]
        public async Task<ActionResult<DinningHallRating>> PostDinningHallRating(DinningHallRating dinningHallRating)
        {
            User? currentUser = ControllerUtilities.GetCurrentUser(_context, HttpContext);
            if (currentUser == null)
            {
                return BadRequest(new ErrorMessageResponse("Authentication error. "));
            }

            Hotel? hotel = _context.Hotels.Find(dinningHallRating.HotelId);
            if (hotel == null)
            {
                return BadRequest(new ErrorMessageResponse("No such hotel. "));
            }

            dinningHallRating.UserId = currentUser.Id;
            
            _context.DinningHallRatings.Add(dinningHallRating);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDinningHallRating", new { id = dinningHallRating.Id }, dinningHallRating);
        }

        // DELETE: api/DinningHallRatings/5
        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = UserRoles.All)]
        public async Task<IActionResult> DeleteDinningHallRating(int id)
        {
            User? currentUser = ControllerUtilities.GetCurrentUser(_context, HttpContext);
            if (currentUser == null)
            {
                return BadRequest(new ErrorMessageResponse("Authentication error. "));
            }

            var dinningHallRating = await _context.DinningHallRatings.FindAsync(id);
            if (dinningHallRating == null)
            {
                return NotFound();
            }

            if (currentUser.Role != UserRoles.Administrator && 
                currentUser.Id != dinningHallRating.UserId)
            {
                return Unauthorized(new ErrorMessageResponse("You can only delete your own ratings. "));
            }

            _context.DinningHallRatings.Remove(dinningHallRating);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DinningHallRatingExists(int id)
        {
            return _context.DinningHallRatings.Any(e => e.Id == id);
        }
    }
}
