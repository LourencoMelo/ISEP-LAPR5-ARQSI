using WarehouseApi.Domain.Shared;

namespace WarehouseApi.Domain.Deliveries
{
    /**
     * Interface for the Repository
     */
    public interface IDeliveryRepository : IRepository<Delivery, DeliveryId>
    {
        /**
         * Method GetDeliveryDate
         */
        Task<Delivery> GetDeliveryDate(string deliveryDate);
        
        Task<List<Delivery>> GetAllDeliveriesByDate(string deliveryDate);
        /**
         * Method GetDeliveryMass
         */
        Task<Delivery> GetDeliveryMass(string deliveryMass);
        /**
         * Method GetWarehouseId
         */
        Task<Delivery> GetWarehouseId(string warehouseId);
        /**
         * Method GetInputTruck
         */
        Task<Delivery> GetDeliveryInputTruck(string inputTruck);
        /**
         * Method GetOutputTruck
         */
        Task<Delivery> GetDeliveryOutputTruck(string outputTruck);
    }
}

