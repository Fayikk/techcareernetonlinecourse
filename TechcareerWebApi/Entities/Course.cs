using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using TechcareerWebApi.Entities.Base;

namespace TechcareerWebApi.Entities
{
    public class Course : BaseEntity
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty ;
        public decimal Price { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public virtual ICollection<Lesson> Lessons { get; set; } = new List<Lesson>();  
        [ForeignKey(nameof(CreatedUser))]
        public Guid CreatedUserId { get; set;   }
        public virtual User CreatedUser {get; set;}
        public virtual ICollection<Enrollment> Enrollments{ get; set; }
    }
}