using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TechcareerWebApi.DTOs;

namespace TechcareerWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EnrollmentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public EnrollmentController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpPost]
        public async Task<IActionResult> Enroll(EnrollmentDTO enrollmentDTO)
        {
            Enrollment enrollment = new()
            {
                CourseId = enrollmentDTO.CourseId,
                StudentId = enrollmentDTO.StudentId,
            };

            await _context.Enrollments.AddAsync(enrollment);
            if(await _context.SaveChangesAsync() > 0)
            {
                return Ok(enrollmentDTO);
            }
            return BadRequest();

        }
    }
}