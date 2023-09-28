namespace WarehouseApi.Domain.Warehouses
{
    public class WarehouseDto
    {
        /**
         * WarehouseDTO id
         */
        public string Id { get; set; }
        /**
         * WarehouseDTO designation
         */
        public string WarehouseDesignation { get; set; }
        /**
         * WarehouseDTO address
         */
        public string WarehouseAddress { get; set; }
        /**
         * WarehouseDTO coordinates
         */
        public string WarehouseCoordinates { get; set; }
        /**
         * WarehouseDTO altitude
         */
        public double WarehouseAltitude { get; set; }
        
        public bool Active { get; set; }
     
        /**
         * WarehouseDTO full information constructor
         */
        public WarehouseDto(string Id, string WarehouseDesignation, string WarehouseAddress,
            string WarehouseCoordinates, double WarehouseAltitude)
        {
            this.Id = Id;
            this.WarehouseDesignation =WarehouseDesignation;
            this.WarehouseAddress = WarehouseAddress;
            this.WarehouseCoordinates = WarehouseCoordinates;
            this.WarehouseAltitude = WarehouseAltitude;
            this.Active = true;
        }
        
    }
}