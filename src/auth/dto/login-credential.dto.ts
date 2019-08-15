import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * Login credential body
 */
export class LoginCredential {

  /**
   * User email
   */
  @IsEmail()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly email: string;

  /**
   * 4-12 char long password
   */
  @MinLength(4)
  @MaxLength(12)
  @ApiModelProperty()
  readonly password: string;
}
