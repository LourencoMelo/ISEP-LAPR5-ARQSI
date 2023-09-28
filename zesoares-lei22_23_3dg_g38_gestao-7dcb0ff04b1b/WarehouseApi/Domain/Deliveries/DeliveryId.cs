using WarehouseApi.Domain.Shared;
using Newtonsoft.Json;

namespace WarehouseApi.Domain.Deliveries;

public class DeliveryId : EntityId
{
    [JsonConstructor]
    public DeliveryId(Guid value) : base(value)
    {
        
    }
    /**
     * Delivery that receives string
     */
    public DeliveryId(String value) : base(value)
    {
        
    }

    /**
     * Creates a Guid by a string
     */
    protected override object createFromString(string text)
    {
        return new Guid(text);
    }
    
    /**
     * A ToString Method
     */
    override 
    public String AsString()
    {
        Guid obj = (Guid)base.ObjValue;
        return obj.ToString();
    }

    /**
     * Return Guid Object
     */
    public Guid AsGuid()
    {
        return (Guid)base.ObjValue;
    }
}