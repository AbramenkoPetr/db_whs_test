import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateIf,
} from 'class-validator';

export class CreateWhsDto {
  @IsNotEmpty()
  @IsString()
  cod_whs: string;

  @IsNotEmpty()
  @IsString()
  name_whs: string;

  // @IsNotEmpty()
  // @IsObject()
  // user: object;

  @IsNotEmpty()
  @IsString()
  cod_okato: string;

  @IsNotEmpty()
  @IsString()
  dateInput: string;

  // @IsNotEmpty()
  // @IsNumber()
  // cod_okatoId: number;

  // @IsNotEmpty()
  // @IsNumber()
  // categoryId: string;

  // @IsNotEmpty()
  // @IsNumber()
  // userId: number;

  

  cover: string;
}
