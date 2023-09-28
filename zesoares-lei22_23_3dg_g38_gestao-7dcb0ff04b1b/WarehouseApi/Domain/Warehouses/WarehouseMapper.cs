namespace WarehouseApi.Domain.Warehouses;

public class WarehouseMapper
{
    /**
     * Method to create a WarehouseDTO from a warehouse
     */
    public static WarehouseDto ToDto(Warehouse request)
    {
        WarehouseDto w = new WarehouseDto(request.Id.AsString(), request.WarehouseDesignation.designation, request.WarehouseAddress.address,
            request.WarehouseCoordinates.ToString(), request.WarehouseAltitude.altitude);
        w.Active = request.Active;
        return w;
    }

    /**
     * Method to create a warehouse from a CreatingWarehouseDto
     */
    public static Warehouse ToDomain2(CreatingWarehouseDto WarehouseDto)
    {
        return new Warehouse(WarehouseDto.WarehouseId, new WarehouseDesignation(WarehouseDto.WarehouseDesignation)
            ,new WarehouseAddress(WarehouseDto.WarehouseAddress)
            ,new WarehouseCoordinates(WarehouseDto.WarehouseCoordinates),
            new WarehouseAltitude(WarehouseDto.WarehouseAltitude));
    }
}