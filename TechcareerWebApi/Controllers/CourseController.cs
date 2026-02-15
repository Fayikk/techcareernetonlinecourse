using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TechcareerWebApi.Entities;

namespace TechcareerWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CourseController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IHttpContextAccessor _contextAccessor;
        public CourseController(ApplicationDbContext context, IHttpContextAccessor contextAccessor)
        {
            _contextAccessor = contextAccessor; 
            _context = context;
        }

       [HttpPost]
       [Authorize(Roles = "Admin")]
       public async Task<IActionResult> CreateCourse(CourseDTO courseDTO)
        {

            Course course = new()
            {
                Title = courseDTO.Title,
                Description = courseDTO.Description,
                Price = courseDTO.Price,
                ImageUrl = courseDTO.ImageUrl,
                CreatedUserId = courseDTO.CreatedUserId,
            };

            await _context.Courses.AddAsync(course);
            if(await _context.SaveChangesAsync() > 0)
            {
                return Ok(courseDTO);
            }
            return BadRequest();

        }


        [HttpGet]
        public async Task<IActionResult> GetCourses()
        {

            // var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value.ToString();
           var userId = _contextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);
            List<Course> courses = await _context.Courses.ToListAsync();
            if(courses.Count > 0)
            {
                return Ok(courses);
            }

            return NotFound();
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetCourse([FromRoute]Guid Id)
        {
            Course course = await _context.Courses.Include(x=>x.Lessons).FirstOrDefaultAsync(x=>x.Id == Id);
            if(course is not null)
            {
                return Ok(course);
            }

            return NotFound();
        }

    }
}