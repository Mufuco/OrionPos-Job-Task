using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using OrionDirectory.Application.Repositories.PhoneDirectoryRepositories;
using OrionDirectory.Application.Repositories.UserRepositoires;
using OrionDirectory.Application.Tokens;
using OrionDirectory.Infastructure.Tokens;
using OrionDirectory.Persistence.Context;
using OrionDirectory.Persistence.Repositories.PhoneDirectoryRepositories;
using OrionDirectory.Persistence.Repositories.UserRepositories;


namespace OrionDirectory.Persistence
{
    public static class ServiceRegistration
    {
        public static void AddPersistenceServices(this IServiceCollection services)
        {          
           services.AddDbContext<OrionDirectoryAPIContext>(options=>options.UseSqlServer(Configuration.ConnectionString),ServiceLifetime.Singleton);
            services.AddScoped<IUserReadRepository, UserReadRepository>();
            services.AddScoped<IUserWriteRepository, UserWriteRepository>();
            services.AddScoped<IPhoneDirectoryReadRepository, PhoneDirectoryReadRepository>();
            services.AddScoped<IPhoneDirectoryWriteRepository, PhoneDirectoryWriteRepository>();
            services.AddScoped<ITokenHandler, TokenHandler>();
        }
    }
}
