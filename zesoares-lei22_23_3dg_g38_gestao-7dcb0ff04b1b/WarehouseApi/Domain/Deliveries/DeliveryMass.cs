using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using WarehouseApi.Domain.Shared;

namespace WarehouseApi.Domain.Deliveries;
[Owned]
public class DeliveryMass : IValueObject
{
    [JsonConstructor]
    public DeliveryMass()
    {
        
    }
    /**
     * Mass (get and set)
     */
    public double Mass { get; private set; }
    
    /**
     * Constructor that receives a double
     */
    public DeliveryMass(double mass)
    {
        Mass = CheckDeliveryMass(mass);
    }
    
    /**
     * Checking if mass is bigger than 0
     */
    private static double CheckDeliveryMass(double mass)
    {
        try
        {
            if (mass <= 0) throw new Exception("The Mass is not in the right format. Needs to be higher than 0");
            return mass;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}