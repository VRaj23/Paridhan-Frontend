import { Address } from '../model/address.model';

export class RegisterRequest{
    username: string;
    password: string;
    name: string;
    address: Address;
}