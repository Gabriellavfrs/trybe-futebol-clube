import { NextFunction, Request, Response } from 'express';
import Auth from '../utils/Auth';

export default class Validations {
  static validateLoginInputs(req: Request, res: Response, next: NextFunction) :Response | void {
    const user = req.body;
    // const requiredKeys = ['email', 'password'];
    // const notFoundedKey = requiredKeys.find((key) => !(key in user));
    if (!user.email || !user.password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const regex = /\S+@\S+\.\S+/;
    const minLength = 6;
    if (!regex.test(user.email) || user.password.length < minLength) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }

  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const token = JSON.parse(authorization.split(' ')[1]);
    try {
      const validToken = Auth.JwtVerify(token);
      req.body.payload = validToken;
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
