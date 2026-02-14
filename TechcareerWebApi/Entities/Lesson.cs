using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using TechcareerWebApi.Entities.Base;

namespace TechcareerWebApi.Entities
{
    public class Lesson : BaseEntity
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public string VideoUrl { get; set; } = string.Empty;
        [ForeignKey(nameof(Course))]
        public Guid CourseId { get; set; }
        [JsonIgnore]
        public virtual Course Course { get; set; }
    }
}