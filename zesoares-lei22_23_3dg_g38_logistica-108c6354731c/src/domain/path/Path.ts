import { AggregateRoot } from "../../core/domain/AggregateRoot";
import {Path_Time} from "./Path_Time";
import {Distance} from "./Distance";
import {Energy} from "./Energy";
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";
import {Result} from "../../core/logic/Result";
import IPathDTO from "../../dto/IPathDTO";

interface PathProps {
    id_warehouse1 : string;     //Id of first warehouse
    id_warehouse2 : string;     //Id of second warehouse
    distance : Distance;        //Distance between warehouses
    path_time : Path_Time;      //Time to travel between warehouses
    energy : Energy;            //Energy consumed while traveling
    extra_time : Path_Time;     //Extra time spent for extra charging
}  

export class Path extends AggregateRoot<PathProps>{  

    /**
     * Returns the unique id of the path
     */
    get id() : UniqueEntityID{
        return this._id;
    }

    //============================================

    /**
     * Returns the id of the origin warehouse 
     */
    get id_warehouse1() : string {
        return this.props.id_warehouse1;
    }

    /**
     * Sets the id of the origin warehouse
     * @param id_warehouse1 new id
     */
    set id_warehouse1(id_warehouse1 : string){
        this.props.id_warehouse1 = id_warehouse1;
    }

    //============================================

    /**
     * Returns the id of the destiny warehouse
     */
    get id_warehouse2() : string {
        return this.props.id_warehouse2;
    }

    /**
     * Sets the id of the destiny warehouse
     * @param id_warehouse2 new id
     */
    set id_warehouse2(id_warehouse2 : string){
        this.props.id_warehouse2 = id_warehouse2;
    }

    //============================================

    /**
     * Returns the distance of the path
     */
    get distance() : Distance {
        return this.props.distance;
    }

    /**
     * Sets the distance of the path
     * @param distance new distance
     */
    set distance(distance : Distance){
        this.props.distance = distance;
    }

    //============================================

    /**
     * Returns the path's time
     */
    get path_time() : Path_Time {
        return this.props.path_time;
    }

    /**
     * Sets the path's time
     * @param path_time new time
     */
    set path_time(path_time : Path_Time){
        this.props.path_time = path_time;
    }

    //============================================

    /**
     * Returns the energy spent in the path
     */
    get energy() : Energy {
        return this.props.energy;
    }

    /**
     * Sets the energy spent of the path
     * @param energy new energy
     */
    set energy(energy : Energy){
        this.props.energy = energy;
    }

    //============================================

    /**
     * Returns the extra time used of the path
     */
    get extra_time() : Path_Time {
        return this.props.extra_time;
    }

    /**
     * Sets the path's extra time
     * @param extra_time new extra time
     */
    set extra_time(extra_time : Path_Time){
        this.props.extra_time = extra_time;
    }

    //============================================

    /**
     * Private constructor to create path
     * @param props  paths data
     * @param id unique identifier
     */
    private constructor (props : PathProps, id? : UniqueEntityID){
        super(props, id);
    }

    /**
     * Static method to create a Path object through a dto object
     * @param pathDTO dto with paths params
     * @param id  unique path identifier
     * @returns Result<Path> if succeded on the creation. Otherwise returns error
     */
    public static create(pathDTO : IPathDTO, id? : UniqueEntityID) : Result<Path> {

        //Extracting path data from the dto object. Value objects must be created because dto only transports primitive type data
        const id_warehouse1 = pathDTO.id_warehouse1;
        const id_warehouse2 = pathDTO.id_warehouse2;
        const distance = Distance.create(pathDTO.distance).getValue();
        const path_time = Path_Time.create(pathDTO.path_time).getValue();
        const energy = Energy.create(pathDTO.energy).getValue();
        const extra_time = Path_Time.create(pathDTO.extra_time).getValue();

        //Creation of the new path with the data extracted from the dto
        const path = new Path({id_warehouse1 : id_warehouse1, id_warehouse2 : id_warehouse2, distance : distance, path_time : path_time, energy : energy, extra_time : extra_time}, id);

        //Returns the path on the result object
        return Result.ok<Path>(path);
    }
}

