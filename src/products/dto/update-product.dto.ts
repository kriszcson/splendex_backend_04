import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductDTO {
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly description: string;
    @ApiProperty()
    readonly article_number: string;
    @ApiProperty()
    readonly origin: string;
    @ApiProperty()
    readonly when_bought;
    @ApiProperty()
    readonly when_expires;
}