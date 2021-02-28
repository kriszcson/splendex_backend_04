import { ApiProperty } from '@nestjs/swagger';

export class StockProductDTO {
    @ApiProperty({
        type: String,
        description: 'The name of the product',
        default: ''
    })
    name: string;

    @ApiProperty({
        type: String,
        description: 'The unique product-code of the product',
        default: ''
    })
    article_number: string;

    @ApiProperty({
        type: String,
        description: 'The date when we get the product.',
        default: ''
    })
    when_bought;

    @ApiProperty({
        type: String,
        description: 'The last possible date to sell the product.',
        default: ''
    })
    when_expires;
}