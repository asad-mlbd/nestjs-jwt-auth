import { Test, TestingModule } from '@nestjs/testing';
import { JwtTokenMiddleware } from './jwt-token.middleware';
import { JwtService } from '@nestjs/jwt';

describe('JwtTokenUserMiddleware', () => {

  let service: JwtTokenMiddleware;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtTokenMiddleware,
        {
          provide: JwtService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<JwtTokenMiddleware>(JwtTokenMiddleware);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
