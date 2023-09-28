using System.Text.Json.Serialization;
using WarehouseApi.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace WarehouseApi.Domain.Warehouses
{
    [Owned]
    public class WarehouseAddress : IValueObject
    {
        
        /**
         * Warehouse address complete
         */
        public string address { get; private set; }
        /**
         * Warehouse street
         */
        public string street{ get; private set; }
        /**
         * Warehouse city
         */
        public string city{ get; private set; }
        /**
         * Warehouse zipCode
         */
        public string zipCode{ get; private set; }
        
        /**
         * Warehouse address empty constructor
         */
        public WarehouseAddress()
        {
        }

        /**
         * Warehouse address full information constructor
         */
        public WarehouseAddress(string Address)
        {
            CheckWarehouseAddress(Address);
        }

        /**
         * Method to check correct address
         */
        public void CheckWarehouseAddress(string address)
        {
            try
            {
                string[] addressSplitted = address.Split(';');
                if (addressSplitted.Length == 3)
                {
                    this.address = address;
                    this.street = addressSplitted[0];
                    this.zipCode = addressSplitted[1];
                    this.city = addressSplitted[2];
                }
            }
            catch
            {
                throw new BusinessRuleValidationException(
                    "Address are not corresponding to the rules (Ex.: Rua Dr. António Bernardino de Almeida, 431;n4249-015 Porto;Portugal).");
            }
        }
    }
}