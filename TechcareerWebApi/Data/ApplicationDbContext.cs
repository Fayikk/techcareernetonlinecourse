using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TechcareerWebApi.Entities;

public class ApplicationDbContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
{
    public ApplicationDbContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Course> Courses { get; set; }
    public DbSet<Enrollment> Enrollments { get; set; }
    public DbSet<Lesson> Lessons { get; set; }


    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
       
       #region UserCourse  
        builder.Entity<Course>()
        .HasOne(c => c.CreatedUser)
        .WithMany(c => c.CreatedCourses)
        .HasForeignKey(c => c.CreatedUserId).OnDelete(DeleteBehavior.Restrict);
        #endregion

       #region CourseLesson 
        builder.Entity<Lesson>()
        .HasOne(c => c.Course)
        .WithMany(c => c.Lessons)
        .HasForeignKey(c => c.CourseId).OnDelete(DeleteBehavior.Cascade);
       #endregion


       #region EnrollmentUser
        builder.Entity<Enrollment>()
        .HasOne(c => c.Student)
        .WithMany(c => c.Enrollments)
        .HasForeignKey(c => c.StudentId).OnDelete(DeleteBehavior.Restrict);
       #endregion


        #region EnrollmentCourse
          builder.Entity<Enrollment>()
        .HasOne(c => c.Course)
        .WithMany(c => c.Enrollments)
        .HasForeignKey(c => c.CourseId).OnDelete(DeleteBehavior.Cascade);
        #endregion


    }



}