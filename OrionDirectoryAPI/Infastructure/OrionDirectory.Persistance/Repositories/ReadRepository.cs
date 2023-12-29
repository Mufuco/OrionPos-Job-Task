using Microsoft.EntityFrameworkCore;
using OrionDirectory.Application.Repositories;
using OrionDirectory.Persistence.Context;
using OrionDirectoryAPI.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace OrionDirectory.Persistence.Repositories
{
    public class ReadRepository<T> : IReadRepository<T> where T : BaseEntity
    {
        private readonly OrionDirectoryAPIContext _context;

        public ReadRepository(OrionDirectoryAPIContext context)
        {
            _context = context;
        }

        public DbSet<T> Table =>_context.Set<T>();

        public IQueryable<T> GetAll() => Table;


        public async Task<T> GetByIdAsync(int id) => await Table.FindAsync(id);

        public async Task<T> GetSingleAsync(Expression<Func<T, bool>> method) => await Table.FirstOrDefaultAsync(method);

        public IQueryable<T> GetWhere(Expression<Func<T, bool>> method) => Table.Where(method);
    }
}
