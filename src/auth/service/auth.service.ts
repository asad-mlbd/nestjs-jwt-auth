import { Injectable, Inject, forwardRef, HttpException, HttpStatus } from '@nestjs/common';
import { User, CreateUserDto, UserService } from '../../user';
import { LoginCredential } from '../dto/login-credential.dto';
import { JwtService, JwtSignOpts } from './../../utils/service/jwt/jwt.service';

@Injectable()
export class AuthService {

  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    private readonly jwtService: JwtService,
  ) {}

  async registerUser(userData: CreateUserDto): Promise<User> {
    return this.userService.createUser(userData);
  }

  async login(credential: LoginCredential) {
    
    const user = await this.userService.getUserByEmail(credential.email);
    const isMatched = await this.userService.checkPassword(user, credential.password);

    if (!isMatched) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const signingOpts: JwtSignOpts = {
      subject   : user.email,
      issuer    : process.env.JWT_KEY_ISSUER,
      audience  : process.env.JWT_KEY_AUDIENCE,
    };

    const accessToken = this.jwtService.getSignKey({ 
      id        : user.id,
      email     : user.email,
      roles     : user.roles,
      tokenUse  : 'access',
    }, { 
        expiresIn : '1h',
        ...signingOpts, 
    });

    const refreshToken = this.jwtService.getSignKey({ 
      id        : user.id,
      tokenUse  : 'refresh',
    }, { 
        expiresIn : '1d',
        ...signingOpts, 
    });
    
    return { accessToken, refreshToken };
  }
}
