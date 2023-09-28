import { Mapper } from "../core/infra/Mapper";

import IPathDTO from "../dto/IPathDTO";

import { Path } from "../domain/path/Path";
import { Model,Document } from 'mongoose';
import { IPathPersistence } from '../dataschema/IPathPersistence';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

export class PathMap extends Mapper<Path> {

    /**
     * Static method that receives path object and transforms it in dto object
     * @param path path to transform
     * @returns dto object with path info
     */
    public static toDTO(path : Path) : IPathDTO {   //Transforms in DTO
        return {

            //Extracting primitive type values of the value objects
            id : path.id.toString(),
            id_warehouse1 : path.id_warehouse1.toString(),
            id_warehouse2 : path.id_warehouse2.toString(),
            distance : path.distance.value,
            path_time : path.path_time.value,
            energy : path.energy.value,
            extra_time : path.extra_time.value

        } as IPathDTO;
    }

    /**
     * Static method that receives path of any type and transforms it in domain object
     * @param path path to transform
     * @returns domain object 
     */
    public static toDomain (path : any | Model<IPathPersistence & Document>) : Path {  //Transforms in Domain

        //Creates path object with received data and saves it in pathOrError constant
        const pathOrError = Path.create(path, new UniqueEntityID(path.domainId));

        //Verifies if constant defined above was succeded or else prints a console error with the error
        pathOrError.isFailure ? console.log(pathOrError.error) : '';

        //Returns the path value if the creation was succeeded. Otherwise returns null object
        return pathOrError.isSuccess ? pathOrError.getValue() : null; 
    }

    /**
     * Static method to transform path of any type in a persistence object to save in the database
     * @param path path to persist
     * @returns persistence object
     */
    public static toPersistence (path : Path) : any {
        const a = {
            domainId : path.id.toString(),
            id_warehouse1 : path.id_warehouse1,
            id_warehouse2 : path.id_warehouse2,
            distance : path.distance.value,
            path_time : path.path_time.value,
            energy : path.energy.value,
            extra_time : path.extra_time.value
        }
        return a;
    }
}