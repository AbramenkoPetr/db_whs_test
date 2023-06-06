import { IsNotEmpty, IsString, ValidateIf, IsNumber } from 'class-validator';

export class EditGtsDto {
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.message)
  message: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.cod_okato)
  cod_okato: string;
}
