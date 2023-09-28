using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WarehouseApi.Domain.Deliveries;
using WarehouseApi.Domain.Warehouses;

namespace WarehouseApi.Infraesctructure.Deliveries
{
    internal class DeliveryEntityTypeConfiguration : IEntityTypeConfiguration<Delivery>
    {
        /**
         * Creating SQL relations
         */
        public void Configure(EntityTypeBuilder<Delivery> builder)
        {
            builder.ToTable("DeliveryTable", SchemaNames.WarehouseAPI);
            builder.HasKey(b => b.Id);
            
            builder.OwnsOne(d => d.DeliveryDate, n => { n.Property(b => b.Date).IsRequired(); });
            builder.OwnsOne(d => d.DeliveryMass, n => { n.Property(b => b.Mass).IsRequired(); });
            builder.HasOne<WarehouseId>(d => d.WarehouseID);
            builder.OwnsOne(d => d.InputTruck, n => { n.Property(b => b.Input).IsRequired(); });
            builder.OwnsOne(d => d.OutputTruck, n => { n.Property(b => b.Output).IsRequired(); });
        }
    }
}

