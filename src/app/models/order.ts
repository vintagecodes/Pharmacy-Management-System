import { Address } from "./address";
import { Cart } from "./cart";

export class Order {
    constructor(
        public orderId: string,
        public userId: string,
        public cart: Cart[],
        public total: number,
        public orderStatus:string,
        public address:Address[]
    ){}
}
