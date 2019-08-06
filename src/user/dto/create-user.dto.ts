import { 
  MaxLength, 
  MinLength, 
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty()
  @MaxLength(100)
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(320)
  readonly email: string;

  @MinLength(4)
  @MaxLength(12)
  readonly password: string;
}
