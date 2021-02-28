import { ApiProperty } from "@nestjs/swagger";

export class UpdateWarehouseDTO {
    @ApiProperty({
        type: String,
        description: 'The address of the warehouse.',
        default: ''
    })
    address: string;
}