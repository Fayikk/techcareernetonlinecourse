using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TechcareerWebApi.DTOs
{
    public class LessonDTO
    {
          public string Title { get; set; }
        public string Content { get; set; }
        public string VideoUrl { get; set; } = string.Empty;
        public Guid CourseId { get; set; }
    }
}