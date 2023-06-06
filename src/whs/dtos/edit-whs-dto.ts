import { IsNotEmpty, IsString, ValidateIf, IsNumber } from 'class-validator';

export class EditWhsDto {
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.id)
  id: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.cod_whs)
  cod_whs: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.name_whs)
  name_whs: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.cod_okato)
  cod_okato: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.dateInput)
  dateInput: string;

  @IsNumber()
  @IsNotEmpty()
  @ValidateIf((o) => o.countView || o.countView === '')
  countView: number;

  @ValidateIf((o) => o.cover)
  cover: string;
}
