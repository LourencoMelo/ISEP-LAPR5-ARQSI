import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { Email } from "./Email";
import { Role } from "../role/Role";
import { Password } from "./Password";
import { Guard } from "../../core/logic/Guard";
import { PhoneNumber } from "./PhoneNumber";
import { IUserDTO } from "../../dto/IUserDTO";

interface UserProps {
  firstName: string;
  lastName: string;
  userName: string;
  phoneNumber: PhoneNumber;
  email: Email;
  password: Password;
  role: string;
  active: boolean;
}

export class User extends AggregateRoot<UserProps> {

  get id(): UniqueEntityID {
    return this._id;
  }

  get email(): Email {
    return this.props.email;
  }

  set email(email: Email) {
    this.props.email = email;
  }

  get firstName(): string {
    return this.props.firstName
  }

  set firstName(firstName: string) {
    this.props.firstName = firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  set lastName(lastName: string) {
    this.props.lastName = lastName;
  }

  get userName(): string {
    return this.props.userName;
  }

  set userName(userName: string) {
    this.props.userName = userName;
  }

  get phoneNumber(): PhoneNumber {
    return this.props.phoneNumber;
  }

  set phoneNumber(phoneNumber: PhoneNumber) {
    this.props.phoneNumber = phoneNumber;
  }

  get password(): Password {
    return this.props.password;
  }

  set password(password: Password){
     this.props.password = password;
  }

  /**
     * Gets the variable active 
     */
  get active(): boolean {
    return this.props.active;
  }

  /**
   * Sets the active variable
   * @param active new active
   */
  set active(active: boolean) {
    this.props.active = active;
  }

  get role(): string {
    return this.props.role;
  }

  set role(value: string) {
    this.props.role = value;
  }

  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(userDTO: IUserDTO, id?: UniqueEntityID): Result<User> {
    const firstName = userDTO.firstName;
    const lastName = userDTO.lastName;
    const userName = userDTO.userName;
    const phoneNumber = PhoneNumber.create(userDTO.phoneNumber).getValue();
    const email = Email.create(userDTO.email).getValue();
    const password = Password.create(userDTO.password).getValue();
    const role = userDTO.role;
    const active = true;


    const user = new User({ firstName: firstName, lastName: lastName, userName: userName, phoneNumber: phoneNumber, email: email, password: password, role: role, active: active }, id);

    return Result.ok<User>(user);
  }
}