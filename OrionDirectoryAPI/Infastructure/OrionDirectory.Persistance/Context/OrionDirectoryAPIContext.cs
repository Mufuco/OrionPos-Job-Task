using Microsoft.EntityFrameworkCore;
using OrionDirectoryAPI.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrionDirectory.Persistence.Context
{
    public class OrionDirectoryAPIContext : DbContext
    {
        public OrionDirectoryAPIContext(DbContextOptions options) : base(options)
        {
        }
       public DbSet<User> Users { get; set; }
        public DbSet<PhoneDirectory> PhoneDirectories { get; set; }
    }
}
