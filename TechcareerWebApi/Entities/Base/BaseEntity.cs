using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TechcareerWebApi.Entities.Base
{
    public abstract class BaseEntity
    {
        protected BaseEntity()
        {
            Id = Guid.NewGuid();
            CreatedDate = DateTime.Now;
        }

        public Guid Id { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}