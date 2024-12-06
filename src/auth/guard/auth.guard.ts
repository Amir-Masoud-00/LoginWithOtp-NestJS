/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const token = context.switchToHttp().getRequest().headers.authorization;
    if(!token){
      throw new UnauthorizedException('توکن نامعتبر است');
    }
    const tokenArray = token.split(' ');
    console.log(tokenArray);
    
    if( tokenArray[0] !== 'Bearer'){
      throw new UnauthorizedException('توکن نامعتبر است');
    }
    return true
  }
}
