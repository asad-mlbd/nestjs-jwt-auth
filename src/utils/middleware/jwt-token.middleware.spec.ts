import { Test, TestingModule } from '@nestjs/testing';
import { JwtTokenMiddleware } from './jwt-token.middleware';
import { JwtService } from '@nestjs/jwt';

describe('JwtTokenUserMiddleware', () => {

  let service: JwtTokenMiddleware;
  let mockReq;
  let mockRes;
  let mockNext;

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

  describe('JwtTokenUserMiddleware.use method', () => {

    beforeEach(() => {
      mockReq  = {};
      mockRes  = {};
      mockNext = () => { /* do nothing */ };
    });

    it('should call getBearerToken with request', () => {
      const mockFn  = jest.spyOn<any, string>(service, 'getBearerToken');
      service.use(mockReq, mockRes, mockNext);
      expect(mockFn).toBeCalledWith(mockReq);
    });
  });

  describe('JwtTokenUserMiddleware.getBearerToken method', () => {

    beforeEach(() => {
      mockReq  = {};
      mockRes  = {};
      mockNext = () => { /* do nothing */ };
    });

    it('should fetch bearer token from request header', () => {
      mockReq = {
        headers: {
          authorization: 'bearer mock-token',
        },
      };
      const mockFn = jest.spyOn<any, string>(service, 'getBearerToken');
      service.use(mockReq, mockRes, mockNext);
      const result = mockFn.mock.results[0];
      expect(result.value).toEqual('mock-token');
    });

    it('should return null when token not exists in request header', () => {
      mockReq = {
        headers: {},
      };
      const mockFn = jest.spyOn<any, string>(service, 'getBearerToken');
      service.use(mockReq, mockRes, mockNext);
      const result = mockFn.mock.results[0];
      expect(result.value).toEqual(null);
    });
  });

  describe('JwtTokenUserMiddleware.getBearerToken method', () => {

    beforeEach(() => {
      mockReq  = {};
      mockRes  = {};
      mockNext = () => { /* do nothing */ };
    });

    it('should fetch bearer token from request header', () => {
      mockReq = {
        headers: {
          authorization: 'bearer mock-token',
        },
      };
      const mockFn = jest.spyOn<any, string>(service, 'getBearerToken');
      service.use(mockReq, mockRes, mockNext);
      const result = mockFn.mock.results[0];
      expect(result.value).toEqual('mock-token');
    });

    it('should return null when token not exists in request header', () => {
      mockReq = {
        headers: {},
      };
      const mockFn = jest.spyOn<any, string>(service, 'getBearerToken');
      service.use(mockReq, mockRes, mockNext);
      const result = mockFn.mock.results[0];
      expect(result.value).toEqual(null);
    });
  });

});
