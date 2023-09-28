using System.Globalization;
using System.Text.Json.Serialization;
using WarehouseApi.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace WarehouseApi.Domain.Warehouses
{
    [Owned]
    public class WarehouseCoordinates : IValueObject
    {
        /*
        public double longitudeValue { get; private set; }
        public string longitudeOrientation{ get; private set; }

        public double latitudeValue{ get; private set; }
        public string latitudeOrientation{ get; private set; }
        */
        
        /**
         * Cooridinates parameter
         */
        public string coordinates { get; private set; }
        private string[] Orientations =
            {"N", "S", "W", "E"};
            
        /**
         * Empty constructor
         */
        [JsonConstructor]
        public WarehouseCoordinates()
        {
        }

        /**
         * Warehouse full coordiantes constructor
         */
        public WarehouseCoordinates(string Text)
        {
            this.coordinates = Text;
            /*
            List<String> list = CheckWarehouseCoordinates(Text);
            longitudeValue = Double.Parse(list[0]);
            longitudeOrientation = list[1];
            latitudeValue = Double.Parse(list[2]);
            latitudeOrientation = list[3];
        */
        }
        
        public List<string> CheckWarehouseCoordinates(string Text)
        {
            
            try
            {
                string[] TextSplitted;

                string[] LongitudeTextSplitted;

                string[] LatitudeTextSplitted;

                if (Text.Contains(";"))
                {
                    TextSplitted = Text.Split(";");

                    if (TextSplitted.Length == 2)
                    {
                        LongitudeTextSplitted = TextSplitted[0].Split(' ');
                        LatitudeTextSplitted = TextSplitted[1].Split(' ');

                        LongitudeTextSplitted[0] = LongitudeTextSplitted[0].Remove(LongitudeTextSplitted[0].Length - 1);
                        LatitudeTextSplitted[1] = LatitudeTextSplitted[1].Remove(LongitudeTextSplitted[0].Length - 1);

                        string x = LongitudeTextSplitted[0];
                        string y = LatitudeTextSplitted[1];

                        double longValue = double.Parse(x, CultureInfo.InvariantCulture);
                        double latValue = double.Parse(y, CultureInfo.InvariantCulture);

                        if (longValue >= -180
                            && longValue <= 180
                            && latValue >= -90
                            && latValue <= 90
                            && Orientations.Contains(LongitudeTextSplitted[1])
                            && Orientations.Contains(LatitudeTextSplitted[2]))
                        {
                            return new List<string>
                            {
                                longValue.ToString(), LongitudeTextSplitted[1], latValue.ToString(),
                                LatitudeTextSplitted[2]
                            };
                        }

                        
                    }
                }
            }
            catch
            {
                throw new BusinessRuleValidationException(
                    "Coordinates are not corresponding to the rules (Ex.: 40.9321° N, 8.2451° W).");
            }
            return null;
        }
        /*
        public override string ToString()
        {
            return $"{longitudeValue}º {longitudeOrientation}; {latitudeValue}º {latitudeOrientation}";
        }
        */
        
        public override string ToString()
        {
            return coordinates;
        }
    }
}