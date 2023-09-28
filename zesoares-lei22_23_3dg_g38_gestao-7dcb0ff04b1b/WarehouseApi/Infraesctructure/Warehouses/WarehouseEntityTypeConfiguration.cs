using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WarehouseApi.Domain.Warehouses;

namespace WarehouseApi.Infraesctructure.Warehouses
{

    internal class WarehouseEntityTypeConfiguration : IEntityTypeConfiguration<Warehouse>
    {
        public void Configure(EntityTypeBuilder<Warehouse> builder)
        {
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx
            
            builder.ToTable("Warehouses", SchemaNames.WarehouseAPI);
            builder.HasKey(b => b.Id);
            
            builder.OwnsOne(w => w.WarehouseDesignation, n => { n.Property(b => b.designation).IsRequired(); });
            builder.OwnsOne(w => w.WarehouseAddress, n => { n.Property(b => b.address).IsRequired(); });
            builder.OwnsOne(w => w.WarehouseCoordinates, n => { n.Property(b => b.ToString()).IsRequired(); });
            builder.OwnsOne(w => w.WarehouseAltitude, n => { n.Property(b => b.altitude).IsRequired(); });
            
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
        
    }

}
