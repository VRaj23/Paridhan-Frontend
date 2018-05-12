import { AddressCreationRequest } from './address-creation-request.model';

export class RegisterRequest{
    username: string;
    password: string;
    name: string;
    email: string;
    addressCreationRequest: AddressCreationRequest;

    constructor(username: string, password: string, name: string
        , email: string, address: AddressCreationRequest){
            this.username = username;
            this.password = password;
            this.name = name;
            this.email = email;
            this.addressCreationRequest = address;
    }
}