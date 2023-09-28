import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Repo } from "../../core/infra/Repo";
import { Role } from "../../domain/role/Role";

export default interface IRoleRepo extends Repo<Role> {
    exists(role: Role): Promise<boolean>;
    save(role: Role): Promise<Role>;
    findByDomainId (roleId: UniqueEntityID | string): Promise<Role>;
    findByName(roleName: string): Promise<Role>;
    findAll() : Promise<Role[]>;
}