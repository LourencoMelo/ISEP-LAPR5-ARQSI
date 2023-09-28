namespace WarehouseApi.Domain.Deliveries;

public class DeliveryDto
{
    /**
     * ID of the Delivery
     */
    public Guid Id { get; set; }
    /**
     * Date of the Delivery
     */
    public string Date { get; set; }
    /**
     * Mass of the Delivery Package
     */
    public double Mass { get; set; }
    /**
     * Warehouse where the Delivery is located
     */
    public string WarehouseId { get; set; }
    /**
     * Time to load the Truck with the delivery
     */
    public int InputTruck { get; set; }
    /**
     * Time to unload the Truck with the delivery
     */
    public int OutputTruck { get; set; }
    
    /**
     * DeliveryDTO Constructor
     */
    public DeliveryDto(Guid Id, string Date, double Mass, string WarehouseId,
        int InputTruck, int OutputTruck)
    {
        this.Id = Id;
        this.Date = Date;
        this.Mass = Mass;
        this.WarehouseId = WarehouseId;
        this.InputTruck = InputTruck;
        this.OutputTruck = OutputTruck;
    }
    
   
    
}