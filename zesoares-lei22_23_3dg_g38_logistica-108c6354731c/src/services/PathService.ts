import { Inject, Service } from "typedi";
import IPathService from "./IServices/IPathService";
import config from "../../config";
import IPathRepo from "./IRepos/IPathRepo";
import IPathDTO from "../dto/IPathDTO";
import { Result } from "../core/logic/Result";
import { PathMap } from "../mappers/PathMap";
import { Path } from "../domain/path/Path";
import {Distance} from "../domain/path/Distance";
import {Path_Time} from "../domain/path/Path_Time";
import {Energy} from "../domain/path/Energy";



@Service()
export default class PathService implements IPathService {

    //Injects dependecy to repository interface where methods to be implemented are defined
    constructor( @Inject(config.repos.path.name) private pathRepo : IPathRepo){}

    /**
     * async method to get a specific path
     * @param pathId unique identifier of path
     * @returns path found dto
     */
    public async getPath(pathId : string) : Promise<Result<IPathDTO>> {

        try {
            const path = await this.pathRepo.findByDomainId(pathId);

            if( path === null ) {
                return Result.fail<IPathDTO>("Path not found");
            }else {
                const pathDTOResult = PathMap.toDTO(path) as IPathDTO;

                return Result.ok<IPathDTO>(pathDTOResult);
            }

        } catch (error) {
            throw error;
        }
    }

    /**
     * async method to create a path
     * @param pathDTO dto with path's data
     * @returns path's result dto
     */
    public async createPath(pathDTO : IPathDTO) : Promise<Result<IPathDTO>> {

        try {
            const pathOrError = await Path.create(pathDTO);

            if (pathOrError.isFailure){
                return Result.fail<IPathDTO>(pathOrError.errorValue());
            }

            const pathResult = pathOrError.getValue();

            await this.pathRepo.save(pathResult);

            const pathDTOResult = PathMap.toDTO(pathResult) as IPathDTO;

            return Result.ok<IPathDTO>(pathDTOResult);

        } catch (error){
            throw error;   
        }

    }

    /**
     * async method to get all paths in database
     * @returns  list of path's dtos founded
     */
    public async getAllPaths(): Promise<Result<IPathDTO[]>> {
        try {

            const paths = await this.pathRepo.findAll();
        
            if (paths === null) {
                return Result.fail<IPathDTO[]>("Paths not found");
            } else {

                let pathsDTO : IPathDTO[] = [];

                paths.forEach(path => {

                    pathsDTO.push(PathMap.toDTO(path) as IPathDTO);

                });

                return Result.ok<IPathDTO[]>(pathsDTO);
            }
        } catch (e) {
          throw e;
        }
      }

      /**
       * async method to update data from an existing path
       * @param pathDTO dto with path's data
       * @returns paths result dto
       */
      public async updatePath(pathDTO: IPathDTO): Promise<Result<IPathDTO>> {
          try{

            const path = await this.pathRepo.findByDomainId(pathDTO.id);
            
            if(path == null){
                return Result.fail<IPathDTO>("Path not found");
            }else{
                path.id_warehouse1 = pathDTO.id_warehouse1;
                path.id_warehouse2 = pathDTO.id_warehouse2;
                path.distance = Distance.create(pathDTO.distance).getValue();
                path.path_time = Path_Time.create(pathDTO.path_time).getValue();
                path.energy = Energy.create(pathDTO.energy).getValue();
                path.extra_time = Path_Time.create(pathDTO.extra_time).getValue();
                
                await this.pathRepo.save(path);

                const pathDTOResult = PathMap.toDTO(path) as IPathDTO;
                return Result.ok<IPathDTO>(pathDTOResult);
            }
          }catch(error){
            throw error;
          }
      }

}