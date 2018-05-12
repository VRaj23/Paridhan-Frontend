export class AddressCreationRequest{
    houseNumber: string;
    area: string;
    landmark: string;
    cityID: number;
    pincode: number;

    constructor(houseNumber: string, area: string, 
        landmark: string, cityID: number, pincode: number){
            this.houseNumber = houseNumber;
            this.area = area;
            this.landmark = landmark;
            this.cityID = cityID;
            this.pincode = pincode;
    }
}