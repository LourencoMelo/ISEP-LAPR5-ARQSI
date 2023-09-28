using Microsoft.EntityFrameworkCore;
using WarehouseApi.Domain.Deliveries;
using WarehouseApi.Infraesctructure.Shared;

namespace WarehouseApi.Infraesctructure.Deliveries;

public class DeliveryRepository : BaseRepository<Delivery, DeliveryId>, IDeliveryRepository
{
    /**
     * Db Context
     */
    private WarehouseAPIDbContext Context;
    
    /**
     * Constructor of the reposository
     */
    public DeliveryRepository(WarehouseAPIDbContext context) : base(context.Deliveries)
    {
        this.Context = context;
    }

    /**
     * Method GetDeliveryDate
     */
    public async Task<Delivery> GetDeliveryDate(string deliveryDate)
    {
        var some = from delivery in this.Context.Deliveries
                where delivery.DeliveryDate.Date.ToString().Equals(deliveryDate)
                    select delivery;
        return await some.FirstOrDefaultAsync();
    }
    
    public async Task<List<Delivery>> GetAllDeliveriesByDate(string deliveryDate)
    {
        return await Context.Deliveries
            .Include(i => i.DeliveryDate)
            .Include(i => i.DeliveryMass)
            .Include(i => i.InputTruck)
            .Include(i => i.OutputTruck)
            .Where(i => deliveryDate.Equals(i.DeliveryDate.Date))
            .Where(i => true.Equals(i.Active))
            .ToListAsync();
    }
    /**
     * Method GetDeliveryMass
     */
    public async Task<Delivery> GetDeliveryMass(string deliveryMass)
    {
        var some = from delivery in this.Context.Deliveries
            where delivery.DeliveryMass.Mass.ToString().Equals(deliveryMass)
            select delivery;
        return await some.FirstOrDefaultAsync();
    }
    /**
     * Method GetWarehouseId
     */
    public async Task<Delivery> GetWarehouseId(string warehouseId)
    {
        var some = from delivery in this.Context.Deliveries
            where delivery.WarehouseID.ToString().Equals(warehouseId)
            select delivery;
        return await some.FirstOrDefaultAsync();
    }
    /**
     * Method GetDeliveryInputTruck
     */
    public async Task<Delivery> GetDeliveryInputTruck(string inputTruck)
    {
        var some = from delivery in this.Context.Deliveries
            where delivery.InputTruck.Input.ToString().Equals(inputTruck)
            select delivery;
        return await some.FirstOrDefaultAsync();
    }
    /**
     * Method GetDeliveryOutputTruck
     */
    public async Task<Delivery> GetDeliveryOutputTruck(string outputTruck)
    {
        var some = from delivery in this.Context.Deliveries
            where delivery.OutputTruck.Output.ToString().Equals(outputTruck)
            select delivery;
        return await some.FirstOrDefaultAsync();
    }
}