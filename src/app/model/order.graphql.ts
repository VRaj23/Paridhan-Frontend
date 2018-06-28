export type QueryGQL = {
	allOrders: OrderGQL[];
}

export type QueryOrder = {
      order(id: number): OrderGQL;
}

export type OrderGQL = {
      orderID: number;
      imageID: number;     
      productName: string;
      quantity: number;
      sizeChar: string;
      status: string;
      typeName: string;
      amount: number;
      brandName: string;
      colorName: string;
      creationDateTime: string;
      customerResponse: CustomerGQL;
      deliveryAddress: AddressGQL;
}

export type AddressGQL = {
	    addressID: number;
        area: string;
        cityName: string;
        houseNumber: string;
        landmark: string;
        pincode: number;
        stateName: string;
}

export type CustomerGQL = {
	 customerID: number;
     email: string;
     name: string;
     username: string;
     addressResponse: AddressGQL;
}