using Microsoft.EntityFrameworkCore;
using OrionDirectoryAPI.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace OrionDirectory.Application.Repositories.PhoneDirectoryRepositories
{
    public interface IPhoneDirectoryReadRepository : IReadRepository<PhoneDirectory>
    {
       
    }
}
