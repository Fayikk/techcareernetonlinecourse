using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TechcareerWebApi.DTOs;
using TechcareerWebApi.Entities;

namespace TechcareerWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LessonController : ControllerBase
    {
         private readonly ApplicationDbContext _context;
        public LessonController(ApplicationDbContext context)
        {
            _context = context;
        }

       [HttpPost]
       public async Task<IActionResult> CreateLesson(LessonDTO lessonDTO)
        {

            Lesson lesson = new()
            {
               Title = lessonDTO.Title,
               Content = lessonDTO.Content,
               VideoUrl = lessonDTO.VideoUrl,
               CourseId = lessonDTO.CourseId,
            };

            await _context.Lessons.AddAsync(lesson);
            if(await _context.SaveChangesAsync() > 0)
            {
                return Ok(lessonDTO);
            }
            return BadRequest();

        }
    }
}