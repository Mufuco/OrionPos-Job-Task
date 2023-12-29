using OrionDirectory.Application.Repositories.PhoneDirectoryRepositories;
using OrionDirectory.Persistence.Context;
using OrionDirectoryAPI.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrionDirectory.Persistence.Repositories.PhoneDirectoryRepositories
{
    internal class PhoneDirectoryReadRepository : ReadRepository<PhoneDirectory>, IPhoneDirectoryReadRepository
    {
        public PhoneDirectoryReadRepository(OrionDirectoryAPIContext context) : base(context)
        {
        }
    }

}
