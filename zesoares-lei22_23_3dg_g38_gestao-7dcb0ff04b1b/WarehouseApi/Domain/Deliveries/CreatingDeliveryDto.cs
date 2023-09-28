namespace WarehouseApi.Domain.Deliveries;

public class CreatingDeliveryDto
{
    /**
     * Parameter of Date
     */
    public string Date { get; set; }
    /**
     * Parameter of Mass
     */
    public double Mass { get; set; }
    /**
     * Parameter of WarehouseId
     */
    public string WarehouseId { get; set; }
    /**
     * Parameter InputTruck
     */
    public int InputTruck { get; set; }
    /**
     * Parameter OutputTruck
     */
    public int OutputTruck { get; set; }

    /**
     * Empty Constructor preventes SQL Errors
     */
    public CreatingDeliveryDto()
    {
        
    }
    /**
     * Full Constructor
     */
    public CreatingDeliveryDto(string date, double deliveryMass, string warehouseId,
        int inputTruck, int outputTruck)
    {
        this.Date = date;
        this.Mass = deliveryMass;
        this.WarehouseId = warehouseId;
        this.InputTruck = inputTruck;
        this.OutputTruck = outputTruck;
    }
}