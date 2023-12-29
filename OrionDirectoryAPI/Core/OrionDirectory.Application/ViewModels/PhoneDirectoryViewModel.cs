using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrionDirectory.Application.ViewModels
{
    public class PhoneDirectoryViewModel
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public int CreatedBy { get; set; }
    }
}
