export class Cart {
    constructor(
        public cartId: string,
        public username: string,
        public drugsId: string,
        public drugsName: string,
        public drugsCost: number,
        public drugsQty: number,
        public stockQty:number,
        public drugsDescription : string,
        public total: number

    ){}
   
}
