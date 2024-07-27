import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, encrypt } from 'src/libs/bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async logIn(email: string, password: string) {
    try {
      // buscar si esque existe

      const user = await this.prismaService.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        throw new BadRequestException('Email o contraseña invalidos.');
      }

      const isPasswordMatch = await compare(password, user.password);

      if (!isPasswordMatch) {
        throw new BadRequestException('Email o contraseña invalidos.');
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userWithoutPassword } = user;

      const paylod = {
        ...userWithoutPassword,
      };

      const access_token = await this.jwtService.signAsync(paylod);

      return { access_token };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('Error al hacer log in');
    }
  }

  async signUp(email: string, password: string) {
    try {
      const userFound = await this.prismaService.user.findUnique({
        where: {
          email,
        },
      });

      if (userFound) throw new BadRequestException('El usuario ya existe');

      const hashedPassword = await encrypt(password);

      const user = await this.prismaService.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userWithoutPassword } = user;

      const paylod = {
        ...userWithoutPassword,
      };

      const access_token = await this.jwtService.signAsync(paylod);

      return { access_token };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new Error(error);
    }
  }
}
