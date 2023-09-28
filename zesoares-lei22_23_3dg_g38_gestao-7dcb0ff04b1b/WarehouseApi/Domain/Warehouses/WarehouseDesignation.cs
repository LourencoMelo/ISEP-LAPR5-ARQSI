using System.Text.Json.Serialization;
using WarehouseApi.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace WarehouseApi.Domain.Warehouses
{
    [Owned]
    public class WarehouseDesignation : IValueObject
    {
        /**
         * Designation parameter
         */
        public string designation { get; private set; }

        /**
         * Empty constructor
         */
        [JsonConstructor]
        public WarehouseDesignation()
        {
        }

        /**
         * Warehouse designation constructor
         */
        public WarehouseDesignation(string designation)
        {
            this.designation = designation;
            //CheckWarehouseDesignation(designation);
        }

        public void CheckWarehouseDesignation(string designation)
        {
            try
            {
                if (designation.Length <= 50)
                {
                    this.designation = designation;
                }
            }
            catch
            {
                throw new BusinessRuleValidationException("Designation must have 50 characters maximum.");
            }
        }
    }
}