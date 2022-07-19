import { CartItem } from "./cart-item";

export class OrderItem {
    imageUrl: string | undefined;
    unitPrice: string| undefined;
    quantity: number| undefined;
    productId: number | undefined;;

    constructor(cartItem: CartItem){
        this.imageUrl = cartItem.imageUrl;
        this.unitPrice = cartItem.unitPrice;
        this.quantity = cartItem.quantity;
        this.productId = cartItem.id;
    }
}
