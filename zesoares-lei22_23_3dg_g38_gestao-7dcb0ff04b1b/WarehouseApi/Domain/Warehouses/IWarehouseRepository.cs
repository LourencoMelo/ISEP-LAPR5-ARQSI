using WarehouseApi.Domain.Shared;

namespace WarehouseApi.Domain.Warehouses{
     
     /**
      * Interface to get all the warehouse information one by one
      */
     public interface IWarehouseRepository : IRepository<Warehouse, WarehouseId>
     {

          Task<Warehouse> GetWarehouseId(string warehouseId);
          Task<Warehouse> GetWarehouseDesignation(string warehouseDesignation);
          Task<Warehouse> GetWarehouseAddress(string warehouseAddress);
          Task<Warehouse> GetWarehouseCoordinates(string warehouseCoordinates);
          Task<Warehouse> GetWarehouseAltitude(string warehouseAltitude);
       
     }

}