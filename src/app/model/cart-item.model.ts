import { ProductDetail } from './product-detail.model';
export class CartItem{
    product: ProductDetail;
    quantity: number;
    price: number;

    constructor(product: ProductDetail, qty: number, price: number){
        this.product = product;
        this.quantity = qty;
        this.price = price;
    }
}