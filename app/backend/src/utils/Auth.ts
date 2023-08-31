import { JwtPayload, Secret, SignOptions, sign, verify } from 'jsonwebtoken';

export default class Auth {
  private static secret: Secret = process.env.JWT_SECRET || 'senhasecreta';
  private static jwtConfig: SignOptions = {
    algorithm: 'HS256', expiresIn: '1d',
  };

  static JwtSign(payload: JwtPayload) : string {
    return sign(payload, Auth.secret, Auth.jwtConfig);
  }

  static JwtVerify(token: string) : JwtPayload | string {
    return verify(token, Auth.secret);
  }
}
