using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using WarehouseApi.Domain.Shared;

namespace WarehouseApi.Domain.Deliveries;
[Owned]

public class DeliveryDate : IValueObject
{
    /**
     * Parameter Date
     */
    public string Date { get; private set;}

    [JsonConstructor]
    
    public DeliveryDate()
    {
        
    }
    /**
     * Constructor of DeliveryDate
     */
    public DeliveryDate(string deliveryDate)
    {
        this.Date = CheckDeliveryDate(deliveryDate);
    }
    /**
     * Checks if the Date is in correct format
     */
    private string CheckDeliveryDate(string deliveryDate)
    {
        try
        {
            if (deliveryDate.Length != 8) throw new Exception("Delivery is not in the right format");
            
            return deliveryDate;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}