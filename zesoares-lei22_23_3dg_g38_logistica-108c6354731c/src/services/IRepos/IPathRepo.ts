import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Repo } from "../../core/infra/Repo";
import { Path } from "../../domain/path/Path";

export default interface IPathRepo extends Repo<Path>{
    save(path : Path) : Promise<Path>;                                  //method to save path
    findByDomainId (postId: UniqueEntityID | string): Promise<Path>;    //method to get a path by its id
    findAll() : Promise<Path[]>;                                        //method to get all paths in database
}