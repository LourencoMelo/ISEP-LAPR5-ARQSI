using Microsoft.EntityFrameworkCore;
using WarehouseApi.Domain.Shared;
using Newtonsoft.Json;

namespace WarehouseApi.Domain.Deliveries;
[Owned]
public class OutputTruck : IValueObject
{
    [JsonConstructor]
    public OutputTruck()
    {
        
    }
    /**
     * Time of the to output to the truck
     */
    public int Output { get; private set; } 
    
    /**
     * OutputTruck Constructor
     */
    public OutputTruck(int output)
    {
        Output = CheckOutputTruck(output);
    }
    /**
     * Checks if 0 min or greater
     */
    private static int CheckOutputTruck(int output)
    {
        try
        {
            if (output < 0) throw new Exception("The time to output needs to be positive");
            return output;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}