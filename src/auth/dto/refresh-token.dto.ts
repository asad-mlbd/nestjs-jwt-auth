import { ApiModelProperty } from '@nestjs/swagger';

/**
 * RefreshToken dto
 */
export class RefreshTokenDto {
  /**
   * access token
   */
  @ApiModelProperty()
  readonly refreshToken: string;
}
