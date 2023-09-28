using System.Data.SqlClient;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WarehouseApi.Domain.Deliveries;
using WarehouseApi.Domain.Shared;
using WarehouseApi.Domain.Warehouses;
using WarehouseApi.Infraesctructure;
using WarehouseApi.Infraesctructure.Deliveries;
using WarehouseApi.Infraesctructure.Shared;
using WarehouseApi.Infraesctructure.Warehouses;
using WarehouseApi.Infrastructure;

namespace WarehouseApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddDbContext<WarehouseAPIDbContext>(opt =>
                opt.UseSqlServer(connectionString: @"Server=tcp:lapr5g38isepsrv.database.windows.net,1433;Initial Catalog=lapr5G38IsepDb;Persist Security Info=False;User ID=adming38;Password=admin123.;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;")
                    .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());

            ConfigureMyServices(services);


            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseSwagger();
            app.UseSwaggerUI();

            app.UseHttpsRedirection();

            app.UseRouting();
            
            app.UseCors("IT3Client");

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        public void ConfigureMyServices(IServiceCollection services)
        {
            services.AddTransient<IUnitOfWork,UnitOfWork>();
            services.AddTransient<IWarehouseRepository,WarehouseRepository>();
            services.AddTransient<IDeliveryRepository,DeliveryRepository>();
            services.AddTransient<WarehouseService>();
            services.AddTransient<DeliveryService>();
            services.AddCors(opt =>
            {
                opt.AddPolicy("IT3Client",
                    b => b.WithOrigins("http://localhost:4200", "http://localhost:63342").AllowAnyHeader().AllowAnyMethod().AllowCredentials());
            });
        }
    }
}
