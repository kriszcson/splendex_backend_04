import { IsNotEmpty } from "class-validator";

export class CreateWarehouseDTO {

    @IsNotEmpty()
    address: string;
    @IsNotEmpty()
    warehouse_number: number;
}