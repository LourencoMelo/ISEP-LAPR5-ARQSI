import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";

import IRoleDTO from "../../dto/IRoleDTO";

interface RoleProps {
    name: string; // Role name
}

export class Role extends AggregateRoot<RoleProps> {

    /**
     * Returns the unique id of the Role
     */
    get id(): UniqueEntityID {
        return this._id;
    }

    /**
     * Returns the name of the role
     */
    get name(): string {
        return this.props.name;
    }

    /**
     * Sets the role name
     */
    set name(value: string) {
        this.props.name = value;
    }

    /**
     * Private constructor
     * @param props role data
     * @param id unique id
     */
    private constructor(props: RoleProps, id?: UniqueEntityID) {
        super(props, id);
    }

    /**
     * Static method to create a Role object through a dto object
     * @param roleDTO dto with role parameters
     * @param id unique id
     * @returns Returns error if  error is found or Result<Role> when succeed
     */
    public static create(roleDTO: IRoleDTO, id?: UniqueEntityID): Result<Role> {
        const name = roleDTO.name;

        if (!!name === false || name.length === 0) {
            return Result.fail<Role>('Must provide a role name')
        } else {
            const role = new Role({ name: name }, id);
            return Result.ok<Role>(role)
        }
    }
}