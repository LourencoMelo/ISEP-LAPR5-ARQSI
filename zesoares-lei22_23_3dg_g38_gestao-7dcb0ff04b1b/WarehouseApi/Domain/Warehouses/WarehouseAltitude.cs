using System.Globalization;
using System.Text.Json.Serialization;
using WarehouseApi.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace WarehouseApi.Domain.Warehouses
{
    [Owned]
    public class WarehouseAltitude : IValueObject
    {
        /**
         * Altitude parameter
         */
        public double altitude { get; private set; }

        /**
         * Warehouse empty altitude
         */
        [JsonConstructor]
        public WarehouseAltitude()
        {
        }

        /**
         * Warehouse full info altitude parameter constructor
         */
        public WarehouseAltitude(double altitude)
        {
            CheckWarehouseAltitude(altitude);
        }

        /**
         * Method to check correct altitude
         */
        public void CheckWarehouseAltitude(double altitude)
        {
            try
            {
                this.altitude = altitude;
            }
            catch
            {
                throw new BusinessRuleValidationException("Altitude must be a number.");
            }
        }
    }
}