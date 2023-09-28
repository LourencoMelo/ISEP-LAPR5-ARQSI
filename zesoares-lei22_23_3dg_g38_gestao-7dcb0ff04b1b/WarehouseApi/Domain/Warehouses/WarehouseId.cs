using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using WarehouseApi.Domain.Shared;

namespace WarehouseApi.Domain.Warehouses
{
    public class WarehouseId : EntityId
    {
        /**
         * Warehouse id constructor receiving a string
         */
        [JsonConstructor]
        public WarehouseId(String value) : base(value)
        {
        }
        
        /**
         * Create GUID from string
         */
        override
        protected Object createFromString(String text)
        {
            return new String(text);
        }
        
        override
        public String AsString()
        {
            String obj = (String)base.ObjValue;
            return obj.ToString();
        }
    }
}