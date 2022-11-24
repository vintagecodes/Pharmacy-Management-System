import { FileHandle } from "./file-handle";

export class Drugs {
    constructor(
        public drugsName: string,
        public drugsDescription: string,
        public drugsCost: number,
        public stockQty: number,
        public categories: string,
        public supplierName: string,
        public dateOfExpiration: string,
        public productImages: FileHandle[]
    ){}


}
