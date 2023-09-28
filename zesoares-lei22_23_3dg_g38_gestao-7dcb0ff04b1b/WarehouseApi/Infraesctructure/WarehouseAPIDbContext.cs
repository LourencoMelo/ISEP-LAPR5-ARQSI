using Microsoft.EntityFrameworkCore;
using WarehouseApi.Domain.Deliveries;
using WarehouseApi.Domain.Warehouses;
using WarehouseApi.Infraesctructure.Deliveries;
using WarehouseApi.Infraesctructure.Warehouses;

namespace WarehouseApi.Infraesctructure
{
    public class WarehouseAPIDbContext : DbContext
    {
        /**
         * Dbset for warehouse 
         */
        public DbSet<Warehouse> Warehouses { get; set; }
        /**
         * DbSet for Delivery
         */
        public DbSet<Delivery> Deliveries { get; set; }

        /**
         * Warehouse Database context constructor
         */
        public WarehouseAPIDbContext(DbContextOptions options) : base(options)
        {
            //Ensures the database is well created
            Database.EnsureCreated();
        }

        /**
         * Apply the configuration of all entitys
         */
        protected /*override*/ void onModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new WarehouseEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new DeliveryEntityTypeConfiguration());
        }
    }
}