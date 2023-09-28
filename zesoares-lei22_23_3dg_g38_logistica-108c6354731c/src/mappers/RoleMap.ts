import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IRolePersistence } from '../dataschema/IRolePersistence';

import IRoleDTO from "../dto/IRoleDTO";
import { Role } from "../domain/role/Role";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class RoleMap extends Mapper<Role> {

    /**
     * Static method that receives roles object and transforms it in dto object
     * @param role role to transform
     * @returns dto object with role info
     */
    public static toDTO(role: Role): IRoleDTO {
        return {
            id: role.id.toString(),
            name: role.name,
        } as IRoleDTO;
    }

    /**
     * Static method that receives role of any type and transforms it in domain object
     * @param role role to transform
     * @returns domain object 
     */
    public static toDomain(role: any | Model<IRolePersistence & Document>): Role {
        const roleOrError = Role.create(
            role,
            new UniqueEntityID(role.domainId)
        );

        roleOrError.isFailure ? console.log(roleOrError.error) : '';

        return roleOrError.isSuccess ? roleOrError.getValue() : null;
    }

      /**
     * Static method to transform role of any type in a persistence object to save in the database
     * @param role role to persist
     * @returns persistence object
     */
    public static toPersistence(role: Role): any {
        return {
            domainId: role.id.toString(),
            name: role.name
        }
    }
}