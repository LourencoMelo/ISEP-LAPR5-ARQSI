import { Service, Inject } from "typedi";

import { Document, FilterQuery, Model } from 'mongoose';
import { IPathPersistence } from '../dataschema/IPathPersistence';

import IPathRepo from "../services/IRepos/IPathRepo";
import { Path } from "../domain/path/Path";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import {PathMap} from "../mappers/PathMap";

@Service()
export default class PathRepo implements IPathRepo{

    private models : any;

    //Injects dependecy to the defined path schema
    constructor( @Inject('PathSchema') private pathSchema : Model<IPathPersistence & Document>,){
    }

    /**
     * async method that verifies if a path received by parameter already exists on the database
     * @param path path to verify existence
     * @returns true if the path exists or false if doesn't exist
     */
    public async exists(path : Path) : Promise<boolean> {

        //Verifies if paths id is a instance of UniqueEntityID class. If true, saves the unique entity id value. Else saves the id received
        const idx = path.id instanceof UniqueEntityID ? (<UniqueEntityID> path.id).toValue() : path.id;

        //Defines query with id saved on the constant above
        const query = {domainId : idx};

        //Saves on a constant the boolean result of the findOne method. If the path with respective id is found then returns true 
        const pathDocument = await this.pathSchema.findOne(query as FilterQuery<IPathPersistence & Document>);

        //Returns the assertion between the result above and true. If the path was found, result is true
        return !!pathDocument == true;
    }

    /**
     * async method that saves a path received by parameter on the database
     * @param path path to save
     * @returns path saved
     */
    public async save(path : Path) : Promise<Path> {

        //Defines query with id saved on the constant above
        const query = {domainId : path.id.toString()};

        //Verifies if a path with the same id already exists on the database
        const pathDocument = await this.pathSchema.findOne(query);

        try{
            //If no path exists, creates one persistence object with the path received by parameter
            if (pathDocument == null){
                const rawPath : Path = PathMap.toPersistence(path);

                const pathCreated = await this.pathSchema.create(rawPath);

                //Returns domain object of the path received
                return PathMap.toDomain(pathCreated);

            }else{
                //If the path already exists the parameters are updated. Used in put request
                pathDocument.id_warehouse1 = path.id_warehouse1;
                pathDocument.id_warehouse2 = path.id_warehouse2;
                pathDocument.distance = path.distance.value;
                pathDocument.path_time = path.path_time.value;
                pathDocument.energy = path.energy.value;
                pathDocument.extra_time = path.extra_time.value;

                await pathDocument.save();

                return path;
            }

        }catch(err){
            throw err;
        }
    }

    /**
     * Gets a path by its unique id
     * @param pathId unique identifier
     * @returns path found
     */
    public async findByDomainId (pathId : UniqueEntityID | string) : Promise<Path>{

        //Defines query with id saved on the constant above
        const query = {domainId : pathId};

        //Saves on a constant the boolean result of the findOne method. If the path with respective id is found then returns true 
        const pathRecord = await this.pathSchema.findOne( query as FilterQuery<IPathPersistence & Document>);

        //If the path is found, returns an domain object with path data. Otherwise, returns null object
        if(pathRecord != null) {
            return PathMap.toDomain(pathRecord);
        }else{
            return null;
        }
    }

    /**
     * Gets all paths in database
     * @returns list of all paths in database 
     */
    public async findAll() : Promise<Path[]>{
        try{
            //Creates empty array of paths to save the found ones
            var pathList : Path[] = [];

            //Saves on a constant list all the paths found
            const list = await this.pathSchema.find();

            //For each path found on the database creates a domain object and adds it to the return list
            list.forEach(path => {

                pathList.push(PathMap.toDomain(path));

            });

            //Returns the final list with domain objects paths
            return pathList;

        }catch(err){
            throw err;
        }
    }

}
