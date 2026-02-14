using Microsoft.AspNetCore.Identity;
using TechcareerWebApi.Entities;

public class User : IdentityUser<Guid>
{
    public string FullName { get; set; }
    public virtual ICollection<Course> CreatedCourses { get; set; }
    public virtual ICollection<Enrollment> Enrollments{ get; set; }
}