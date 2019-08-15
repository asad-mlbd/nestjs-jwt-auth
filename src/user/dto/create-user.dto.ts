import {
  MaxLength,
  MinLength,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

/**
 * User create/ registration dto
 */
export class CreateUserDto {

  /**
   * user name
   */
  @IsNotEmpty()
  @MaxLength(100)
  readonly name: string;

  /**
   * user email
   */
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(320)
  readonly email: string;

  /**
   * user 4-12 char long password
   */
  @MinLength(4)
  @MaxLength(12)
  readonly password: string;
}
