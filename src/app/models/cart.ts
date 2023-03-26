import { FileHandle } from "./file-handle";

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
        public categories: string,
        public supplierName: string,
        public dateOfExpiration: string,
        public productImages: FileHandle[],
        public total: number

    ){}
   
}
