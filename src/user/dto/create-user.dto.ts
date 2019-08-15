import {
  MaxLength,
  MinLength,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * User create/ registration dto
 */
export class CreateUserDto {

  /**
   * user name
   */
  @IsNotEmpty()
  @MaxLength(100)
  @ApiModelProperty()
  readonly name: string;

  /**
   * user email
   */
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(320)
  @ApiModelProperty()
  readonly email: string;

  /**
   * user 4-12 char long password
   */
  @MinLength(4)
  @MaxLength(12)
  @ApiModelProperty({
    minLength: 4,
    maxLength: 12,
  })
  readonly password: string;
}
