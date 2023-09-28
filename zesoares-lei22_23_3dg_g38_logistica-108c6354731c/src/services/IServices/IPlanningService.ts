import { Result } from "../../core/logic/Result";
import IPlanningDTO from "../../dto/IPlanningDTO";

export default interface IPlanningService{

    getPlanning() : Promise<Result<IPlanningDTO>>;
    getAllViagens() : Promise<Result<IPlanningDTO[]>>;
}
