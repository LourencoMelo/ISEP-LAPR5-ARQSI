using WarehouseApi.Domain.Shared;

namespace WarehouseApi.Domain.Warehouses
{
    public class Warehouse : Entity<WarehouseId>, IAggregateRoot
    {
        /**
         * Warehouse designation parameter
         */
        public WarehouseDesignation WarehouseDesignation { get; private set; }

        /**
         * Warehouse address parameter
         */
        public WarehouseAddress WarehouseAddress { get; private set; }

        /**
         * Warehouse coordinates parameter
         */
        public WarehouseCoordinates WarehouseCoordinates { get; private set; }

        /**
         * Warehouse altitude parameter
         */
        public WarehouseAltitude WarehouseAltitude { get; private set; }

        /**
         * Warehouse state parameter
         */
        public bool Active { get; private set; }

        /**
         * Empty constructor creates a empty warehouse but active
         */
        private Warehouse()
        {
            this.Active = true;
        }

        /**
         * Constructor to create a full information warehouse
         */
        public Warehouse(string id, WarehouseDesignation WarehouseDesignation, WarehouseAddress WarehouseAddress,
            WarehouseCoordinates WarehouseCoordinates, WarehouseAltitude WarehouseAltitude)
        {
            try
            {
                if (id.Length == 3)
                {
                    this.Id = new WarehouseId(id);
                    this.WarehouseDesignation = WarehouseDesignation;
                    this.WarehouseAddress = WarehouseAddress;
                    this.WarehouseCoordinates = WarehouseCoordinates;
                    this.WarehouseAltitude = WarehouseAltitude;
                    this.Active = true;
                }
            }
            catch
            {
                throw new BusinessRuleValidationException("Designation must have 50 characters maximum.");
            }
        }

        /**
         * Method to change the designation of a warehouse
         */
        public void ChangeDesignation(WarehouseDesignation warehouseDesignation)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException(
                    "It is not possible to change the designation to an inactive Warehouse.");
            this.WarehouseDesignation = warehouseDesignation;
        }

        /**
         * Method to change the address of a warehouse
         */
        public void ChangeAddress(WarehouseAddress address)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException(
                    "It is not possible to change the address to an inactive Warehouse.");
            this.WarehouseAddress = address;
        }

        /**
         * Method to change the coordinates of a warehouse
         */
        public void ChangeCoordinates(WarehouseCoordinates coordinates)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException(
                    "It is not possible to change the coordinates to an inactive Warehouse.");
            this.WarehouseCoordinates = coordinates;
        }

        /**
         * Method to change the altitude of a warehouse
         */
        public void ChangeAltitude(WarehouseAltitude altitude)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException(
                    "It is not possible to change the altitude to an inactive Warehouse.");
            this.WarehouseAltitude = altitude;
        }

        /**
         * Method to inactivate a warehouse
         */
        public void MarkAsInative()
        {
            this.Active = false;
        }

        public void MarkAsActive()
        {
            this.Active = true;
        }
    }
}