import { ShoppingCart } from './shopping-cart';

export class Order {
    datePlaced: number;
    items: any[];

    constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart) {
        this.datePlaced = new Date().getTime();
        this.items = shoppingCart.items.map(itm => {
          return {
            name: itm.name,
            price: itm.price,
            qty: itm.qty,
            quantity: itm.quantity,
            totalPrice: itm.totalPrice
          };
        });
    }
}
