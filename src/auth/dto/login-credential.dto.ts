import { 
  IsEmail, 
  IsNotEmpty, 
  MinLength, 
  MaxLength
} from 'class-validator';

export class LoginCredential {

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  
  @MinLength(4)
  @MaxLength(12)
  readonly password: string;
}