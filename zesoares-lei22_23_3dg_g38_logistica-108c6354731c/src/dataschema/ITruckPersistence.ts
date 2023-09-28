export interface ITruckPersistence {
    domainId : String 
    designation : string; // Truck designation "name"
    tara : number; // Weight of the truck completly empty
    cargoCapacity : number; // Maximum capacity of the truck
    maxBattery : number; // Maximum energy of the both batterys combined
    autonomy : number; // Truck autonomy with full weight and maximum battery
    chargingTime : number; // Time that takes the battery to charge from 20% to 80%
    active : boolean; //Sets the truck active or inactive
}