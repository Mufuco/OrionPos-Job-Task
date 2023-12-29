using OrionDirectory.Application.Repositories.UserRepositoires;
using OrionDirectory.Persistence.Context;
using OrionDirectoryAPI.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrionDirectory.Persistence.Repositories.UserRepositories
{
    public class UserWriteRepository : WriteRepository<User>, IUserWriteRepository
    {
        public UserWriteRepository(OrionDirectoryAPIContext context) : base(context)
        {
        }
    }
}
