import { Product } from './product';

export class ShoppingCartItem {
    $key: string;
    name: string;
    price: number;
    qty: number; // number of cakes tgt (4 cakes, 8 cakes)
    quantity: number // actual quantity (8 cakes X 3 (this))

    constructor(init?: Partial<ShoppingCartItem>) {
        Object.assign(this, init);
    }

    get totalPrice() {
        return this.price * this.quantity;
    }
}