import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization;

    console.log('token', token);

    if (!token) {
      throw new UnauthorizedException('Unouthorized');
    }

    /**
     * sementara fake user dulu
     * nanti diganti Better Auth verification
     */
    request.user = {
      id: 'user_1',
      role: 'GYM_OWNER',
      gymId: 'gym_1',
    };

    return true;
  }
}
