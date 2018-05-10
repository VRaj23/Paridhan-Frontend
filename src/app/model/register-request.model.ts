import { AddressCreationRequest } from './address-creation-request.model';

export class RegisterRequest{
    username: string;
    password: string;
    name: string;
    email: string;
    address: AddressCreationRequest;
}