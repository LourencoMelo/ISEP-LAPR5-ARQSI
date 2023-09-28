using WarehouseApi.Domain.Warehouses;

namespace WarehouseApi.Domain.Deliveries;

public class DeliveryMapper
{
    /**
     * Receives a delivery Object and transforms to a Delivery Dto
     */
    public static DeliveryDto ToDto(Delivery request)
    {
        return new DeliveryDto(request.Id.AsGuid(), request.DeliveryDate.Date.ToString(), request.DeliveryMass.Mass, 
            request.WarehouseID.Value, request.InputTruck.Input, request.OutputTruck.Output);
    }
    
    /**
     * Receives a creatingDeliveryDto and transforms to a Delivery object
     */
    public static Delivery ToDomain2(CreatingDeliveryDto creatingDeliveryDto)
    {
        return new Delivery(new DeliveryDate(creatingDeliveryDto.Date), new DeliveryMass(creatingDeliveryDto.Mass),
            new WarehouseId(creatingDeliveryDto.WarehouseId), new InputTruck(creatingDeliveryDto.InputTruck),
            new OutputTruck(creatingDeliveryDto.OutputTruck));
    }
}