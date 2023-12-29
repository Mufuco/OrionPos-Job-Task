using OrionDirectoryAPI.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrionDirectoryAPI.Domain.Entities
{
    public class PhoneDirectory:BaseEntity
    {
        public string PhoneNumber { get; set; }
        public string Name { get; set;}

        public User CreatedBy { get; set; }

    }
}
