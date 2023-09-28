import { Result } from "../../core/logic/Result";
import IPathDTO from "../../dto/IPathDTO";


export default interface IPathService  {
  getPath(pathId: string): Promise<Result<IPathDTO>>;         //Gets a path by its id
  createPath(pathDTO: IPathDTO): Promise<Result<IPathDTO>>;   //Creates new path with dto info
  updatePath(pathDTO: IPathDTO): Promise<Result<IPathDTO>>;   //Updates existent path with dto info
  getAllPaths(): Promise<Result<IPathDTO[]>>;                 //Gets all paths in database
}
