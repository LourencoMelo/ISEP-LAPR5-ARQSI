using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using WarehouseApi.Domain.Shared;

namespace WarehouseApi.Domain.Deliveries;
[Owned]
public class InputTruck : IValueObject
{
    [JsonConstructor]
    public InputTruck()
    {
        
    }

    /**
     * Time of the to input to the truck
     */
    public int Input { get; private set;}
    /**
     * Constructor of class
     */
    public InputTruck(int input)
    {
        Input = CheckInputTruck(input);
    }
    
    /**
     * Checks if 0 min or greater
     */
    private static int CheckInputTruck(int input)
    {
        try
        {
            if (input < 0) throw new Exception("The time to input needs to be positive");
            return input;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}