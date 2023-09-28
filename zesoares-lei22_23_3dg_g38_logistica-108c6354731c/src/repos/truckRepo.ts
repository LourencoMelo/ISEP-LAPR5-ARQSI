import { Service, Inject } from 'typedi';

import ITruckRepo from "../services/IRepos/ITruckRepo";
import { Truck } from "../domain/truck/Truck";
import { TruckMap } from "../mappers/TruckMap";
import { Document, FilterQuery, Model } from 'mongoose';
import { ITruckPersistence } from '../dataschema/ITruckPersistence';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

@Service()
export default class truckRepo implements ITruckRepo {
  private models: any;

  //Injects dependecy to the defined truck schema
  constructor(
    @Inject('truckSchema') private truckSchema : Model<ITruckPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

    /**
     * async method that verifies if a truck received by parameter already exists on the database
     * @param truck truck to verify existence
     * @returns true if the truck exists or false if doesn't exist
     */
  public async exists(truck: Truck): Promise<boolean> {
    const idX = truck.id instanceof UniqueEntityID ? (<UniqueEntityID>truck.id).toValue() : truck.id;

    const query = {domainId: idX};

    const truckDocument = await this.truckSchema.findOne(query as FilterQuery<ITruckPersistence & Document>);

    return !!truckDocument === true;
  }

    /**
     * async method that saves a truck received by parameter on the database
     * @param truck truck to save
     * @returns truck saved
     */
  public async save (truck: Truck): Promise<Truck> {
    const query = { domainId: truck.id.toString()}; 

    const truckDocument = await this.truckSchema.findOne( query );

    try {
      if (truckDocument === null ) {
        const rawTruck: any = TruckMap.toPersistence(truck);

        const truckCreated = await this.truckSchema.create(rawTruck);

        return TruckMap.toDomain(truckCreated);
      } else {
        truckDocument.designation = truck.designation;
        truckDocument.tara = truck.tara.value;
        truckDocument.cargoCapacity = truck.cargoCapacity.value;
        truckDocument.maxBattery = truck.maxBattery.value;
        truckDocument.autonomy = truck.autonomy.value;
        truckDocument.chargingTime = truck.autonomy.value;
        truckDocument.active = truck.active;

        await truckDocument.save();

        return truck;
      }
    } catch (err) {
      throw err;
    }
  }

    /**
     * Gets a truck by its unique id
     * @param truckID unique identifier
     * @returns truck found
     */
  public async findByDomainId (truckID: UniqueEntityID | string): Promise<Truck> {
    const query = { domainId: truckID};
    const truckRecord = await this.truckSchema.findOne( query as FilterQuery<ITruckPersistence & Document> );

    if( truckRecord != null) {
      return TruckMap.toDomain(truckRecord);
    }
    else
      return null;
  }

     /**
     * Gets all trucks in database
     * @returns list of all trucks in database 
     */
  public async findAll(): Promise<Truck[]> {
        try {
        var truckList: Truck[] = [];
        const list = await this.truckSchema.find();
        list.forEach(truck => {
            truckList.push(TruckMap.toDomain(truck));
        });
        return truckList;
        }
        catch(e){
        throw e;
        }
    }

    public async findAllActive() : Promise<Truck[]>{
      try{
        const query = {active:true};
        var truckList: Truck[] = [];

        const list = await this.truckSchema.find(query as FilterQuery<ITruckPersistence & Document>);
        list.forEach(truck => {
          truckList.push(TruckMap.toDomain(truck));
        });
        return truckList;
      }
      catch(e){
        throw e;
      }
    }
  
}