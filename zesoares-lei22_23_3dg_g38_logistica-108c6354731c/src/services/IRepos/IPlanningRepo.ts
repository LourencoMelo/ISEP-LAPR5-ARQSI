import { Planning } from "../../domain/planning/Planning";
import { Repo } from "../../core/infra/Repo";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";

export default interface IPlanningRepo extends Repo<Planning> {
    exists(planning: Planning): Promise<boolean>;
    save(planning: Planning): Promise<Planning>;
    findByDomainId(planningID: UniqueEntityID | string): Promise<Planning>;
    findAll(): Promise<Planning[]>;
}