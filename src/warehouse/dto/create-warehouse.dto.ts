import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateWarehouseDTO {

    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'The address of the warehouse.',
        default: ''
    })
    address: string;
}