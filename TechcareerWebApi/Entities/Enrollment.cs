using System.ComponentModel.DataAnnotations.Schema;
using TechcareerWebApi.Entities;
using TechcareerWebApi.Entities.Base;

public class Enrollment : BaseEntity
{
    [ForeignKey(nameof(Course))]
    public Guid CourseId { get; set; }
    public virtual Course Course { get; set; }
    [ForeignKey(nameof(Student))]
    public Guid StudentId { get; set; }
    public virtual User Student { get; set; }


}