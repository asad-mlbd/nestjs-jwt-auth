
/**
 * Login response dto
 */
export class TokenDto {
  /**
   * access token
   */
  readonly accessToken: string;

  /**
   * refresh token
   */
  readonly refreshToken: string;
}
