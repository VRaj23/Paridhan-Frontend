export class OrderRequest
{
    amount: number;
    deliveryAddressID: number;
    productLineID: number;
    quantity: number;

    constructor(lineID: number, addressID: number, qty: number, amount: number){
        this.productLineID = lineID;
        this.deliveryAddressID = addressID;
        this.quantity = qty;
        this.amount = amount;
    }
}