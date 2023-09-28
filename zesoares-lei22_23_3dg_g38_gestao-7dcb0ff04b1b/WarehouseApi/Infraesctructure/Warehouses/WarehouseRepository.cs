using Microsoft.EntityFrameworkCore;
using WarehouseApi.Domain.Warehouses;
using WarehouseApi.Infraesctructure.Shared;

namespace WarehouseApi.Infraesctructure.Warehouses;

public class WarehouseRepository : BaseRepository<Warehouse, WarehouseId>, IWarehouseRepository
{
    private WarehouseAPIDbContext Context;
    public WarehouseRepository(WarehouseAPIDbContext context) : base(context.Warehouses)
    {
        this.Context = context;
    }
    
    public async Task<Warehouse> GetWarehouseId(string text)
    {
        var some = from warehouse in this.Context.Warehouses
            where warehouse.Id.Equals(text)
            select warehouse;
        return await some.FirstOrDefaultAsync();
    }

    public async Task<Warehouse> GetWarehouseDesignation(string text)
    {
        var some = from warehouse in this.Context.Warehouses
            where warehouse.WarehouseDesignation.designation.Equals(text)
            select warehouse;
        return await some.FirstOrDefaultAsync();
    }

    public async Task<Warehouse> GetWarehouseAddress(string text)
    {
        var some = from warehouse in this.Context.Warehouses
            where warehouse.WarehouseAddress.address.Equals(text)
            select warehouse;
        return await some.FirstOrDefaultAsync();
    }

    public async Task<Warehouse> GetWarehouseCoordinates(string text)
    {
        var some = from warehouse in this.Context.Warehouses
            where warehouse.WarehouseCoordinates.ToString().Equals(text)
            select warehouse;
        return await some.FirstOrDefaultAsync();
    }

    public async Task<Warehouse> GetWarehouseAltitude(string text)
    {
        var some = from warehouse in this.Context.Warehouses
            where warehouse.WarehouseAltitude.altitude.Equals(text)
            select warehouse;
        return await some.FirstOrDefaultAsync();
    }
}