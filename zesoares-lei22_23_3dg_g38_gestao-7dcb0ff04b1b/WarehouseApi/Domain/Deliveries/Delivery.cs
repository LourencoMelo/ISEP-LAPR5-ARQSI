using WarehouseApi.Domain.Shared;
using WarehouseApi.Domain.Warehouses;

namespace WarehouseApi.Domain.Deliveries;

public class Delivery : Entity<DeliveryId>, IAggregateRoot
{
    /**
     * Date of the Delivery(get and set)
     */
    public DeliveryDate DeliveryDate { get; private set; }
    /**
     * Mass of the Delivery(get and set)
     */
    public DeliveryMass DeliveryMass { get; private set; }
    /**
     * WarehouseID of the Delivery(get and set)
     */
    public WarehouseId WarehouseID { get; private set;}
    /**
     * Time to load on to the Truck of the Delivery(get and set)
     */
    public InputTruck InputTruck { get; private set; } 
    /**
     * Time to unload the delivery in the truck
     */
    public OutputTruck OutputTruck { get; private set; }
    /**
     * Parameter to check if it's not delivered
     */
    public bool Active { get; private set; }

    /**
     * Empty Constructor to prevent SQL Errors 
     */
    public Delivery()
    {
        
    }
    /**
     * Fully Constructor
     */
    public Delivery(DeliveryDate DeliveryDate, DeliveryMass DeliveryMass, WarehouseId WarehouseID, InputTruck InputTruck, OutputTruck OutputTruck)
    {
        Id = new DeliveryId(Guid.NewGuid());
        this.DeliveryDate = DeliveryDate;
        this.DeliveryMass = DeliveryMass;
        this.WarehouseID = WarehouseID;
        this.InputTruck = InputTruck;
        this.OutputTruck = OutputTruck;
        this.Active = true;
    }
    /**
     * Method to change Date(used in PUT)
     */
    public void ChangeDeliveryDate(DeliveryDate DeliveryDateAltered)
    {
        if (!this.Active)
            throw new BusinessRuleValidationException("It's not possible to change the date to an inactive delivery.");
        DeliveryDate = DeliveryDateAltered;
    }
    
    /**
     * Method to change Mass(used in PUT)
     */
    public void ChangeDeliveryMass(DeliveryMass DeliveryMassAltered)
    {
        if (!this.Active)
            throw new BusinessRuleValidationException("It's not possible to change the mass to an inactive delivery.");
        DeliveryMass = DeliveryMassAltered;
    }
    /**
     * Method to change WarehouseID(used in PUT)
     */
    public void ChangeWarehouseID(WarehouseId WarehouseIDAltered)
    {
        if (!this.Active)
            throw new BusinessRuleValidationException(
                "It's not possible to change the warehouse id to an inactive delivery.");
        this.WarehouseID = WarehouseIDAltered;
    }
    /**
     * Method to change InputTruck(used in PUT)
     */
    public void ChangeInputTruck(InputTruck InputTruckAltered)
    {
        if (!this.Active)
            throw new BusinessRuleValidationException(
                "It's not possible to change the input truck to an inactive delivery.");
        InputTruck = InputTruckAltered;
    }
    /**
     * Method to change OutputTruck(used in PUT)
     */
    public void ChangeOutputTruck(OutputTruck OutputTruckAltered)
    {
        if (!this.Active)
            throw new BusinessRuleValidationException(
                "It's not possible to change the output truck to an inactive delivery.");
        OutputTruck = OutputTruckAltered;
    }
    
    /**
     * Method to change the parameter "Active"
     */
    public void MarkAsInative()
    {
        this.Active = false;
    }
}
