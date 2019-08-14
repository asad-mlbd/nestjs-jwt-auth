import { 
  IsEmail, 
  IsNotEmpty, 
  MinLength, 
  MaxLength
} from 'class-validator';

/**
 * Login credential body
 */
export class LoginCredential {

  /**
   * User email
   */
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  
  /**
   * 4-12 char long password
   */
  @MinLength(4)
  @MaxLength(12)
  readonly password: string;
}