namespace WarehouseApi.Domain.Warehouses;

public class CreatingWarehouseDto
{
    /**
     * WarehouseDTO id
     */
    public string WarehouseId { get; set; }
    
    /**
     * WarehouseDTO designation parameter
     */
    public string WarehouseDesignation { get; set; }
    
    /**
     * WarehouseDTO address parameter
     */
    public string WarehouseAddress { get; set; }
    
    /**
     * WarehouseDTO coordinates parameter
     */
    public string WarehouseCoordinates { get; set; }
    
    /**
     * WarehouseDTO altitude parameter
     */
    public double WarehouseAltitude { get; set; }
    
    public bool Active { get; set; }

    /**
     * Empty constructor
     */
    public CreatingWarehouseDto()
    {
        
    }

    /**
     * Constructor to create a warehouseDto
     */
    public CreatingWarehouseDto(string WarehouseId, string WarehouseDesignation, string WarehouseAddress,
        string WarehouseCoordinates, double WarehouseAltitude, bool Active)
    {
        this.WarehouseId = WarehouseId;
        this.WarehouseDesignation = WarehouseDesignation;
        this.WarehouseAddress = WarehouseAddress;
        this.WarehouseCoordinates = WarehouseCoordinates;
        this.WarehouseAltitude = WarehouseAltitude;
        this.Active = Active;
    }
}