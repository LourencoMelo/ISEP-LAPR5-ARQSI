import { Service, Inject } from 'typedi';

import IRoleRepo from "../services/IRepos/IRoleRepo";
import { Role } from "../domain/role/Role";
import { RoleMap } from "../mappers/RoleMap";
import { Document, FilterQuery, Model } from 'mongoose';
import { IRolePersistence } from '../dataschema/IRolePersistence';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

@Service()
export default class RoleRepo implements IRoleRepo {
  private models: any;

  //Injects dependecy to the defined role schema
  constructor(
    @Inject('RoleSchema') private roleSchema: Model<IRolePersistence & Document>,
  ) { }

  private createBaseQuery(): any {
    return {
      where: {},
    }
  }

  /**
     * async method that verifies if a role received by parameter already exists on the database
     * @param role role to verify existence
     * @returns true if the role exists or false if doesn't exist
     */
  public async exists(role: Role): Promise<boolean> {

    const idX = role.id instanceof UniqueEntityID ? (<UniqueEntityID>role.id).toValue() : role.id;

    const query = { domainId: idX };
    const roleDocument = await this.roleSchema.findOne(query as FilterQuery<IRolePersistence & Document>);

    return !!roleDocument === true;
  }

  /**
     * async method that saves a role received by parameter on the database
     * @param role role to save
     * @returns role saved
     */
  public async save(role: Role): Promise<Role> {
    const query = { domainId: role.id.toString() };

    const roleDocument = await this.roleSchema.findOne(query);

    try {
      if (roleDocument === null) {
        const rawRole: any = RoleMap.toPersistence(role);

        const roleCreated = await this.roleSchema.create(rawRole);

        return RoleMap.toDomain(roleCreated);
      } else {
        roleDocument.name = role.name;
        await roleDocument.save();

        return role;
      }
    } catch (err) {
      throw err;
    }
  }

  /**
     * Gets a role by its unique id
     * @param roleId unique identifier
     * @returns role found
     */
  public async findByDomainId(roleId: UniqueEntityID | string): Promise<Role> {
    const query = { domainId: roleId };
    const roleRecord = await this.roleSchema.findOne(query as FilterQuery<IRolePersistence & Document>);

    if (roleRecord != null) {
      return RoleMap.toDomain(roleRecord);
    }
    else
      return null;
  }

  /**
     * Gets a role by its unique name
     * @param name unique name
     * @returns role found
     */
  public async findByName(roleName: string): Promise<Role> {
    const query = { name: roleName };
    const roleRecord = await this.roleSchema.findOne(query as FilterQuery<IRolePersistence & Document>);

    if (roleRecord != null) {
      return RoleMap.toDomain(roleRecord);
    }
    else
      return null;
  }

  public async findAll(): Promise<Role[]> {
    try {
      var roleList: Role[] = [];
      const list = await this.roleSchema.find();
      list.forEach(role => {
        roleList.push(RoleMap.toDomain(role));
      });
      return roleList;
    }
    catch (e) {
      throw e;
    }
  }
}