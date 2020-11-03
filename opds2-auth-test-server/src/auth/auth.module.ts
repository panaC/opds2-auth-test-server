import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';
import { JwtStrategy } from './jwt.strategy';
import { BasicStrategy } from './basic.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register(
      {
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '60s' },
      }
    )],
  providers: [AuthService, LocalStrategy, JwtStrategy, BasicStrategy],
  exports: [AuthService]
})
export class AuthModule {}
