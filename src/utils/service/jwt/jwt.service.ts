import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as jwt from 'jsonwebtoken';

const KEY_PATH = path.resolve(__dirname, './../../../../keys');

export interface JwtSignOpts {
  subject   ?: string;
  tokenUse  ?: string;
  issuer    ?: string;
  audience  ?: string;
  expiresIn ?: string;
}

@Injectable()
export class JwtService {

  private privateKey: string;

  private publicKey: string;
  
  constructor() {
    this.privateKey = this.readKey('private');
    this.publicKey  = this.readKey('public');
  }

  private readKey(name: 'public' | 'private') {
    return fs.readFileSync(`${KEY_PATH}/${name}.key`, 'utf8');
  }

  public getSignKey(payload: object, opt: JwtSignOpts) {
    return jwt.sign(payload, this.privateKey, { algorithm: 'RS256', ...opt});
  }

  public verify(token: string, opt: JwtSignOpts) {
    try{
      return jwt.verify(token, this.publicKey, { algorithm: ['RS256'], ...opt});
    }catch (err){
      return false;
    }
  }

  public decode (token): object {
    return jwt.decode(token, {complete: true});
  }

}
