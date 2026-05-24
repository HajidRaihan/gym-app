import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { RegisterOwnerDto } from "./dto/register-owner.dto";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "./dto/login.dto";
import { dateTimestampProvider } from "rxjs/internal/scheduler/dateTimestampProvider";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async registerOwner(dto: RegisterOwnerDto) {

        const existingUser = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })

        if (existingUser) {
            throw new BadRequestException('Email already exists');
        }

        const  existingGym = await this.prisma.gym.findUnique({
            where: {
                slug: dto.gymSlug,
            }
        })
        
        if (existingGym) {
            throw new BadRequestException('Gym slug already exists');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const gym = await this.prisma.gym.create({
            data: {
                name: dto.name,
                slug: dto.gymSlug,
                
                users: {
                    create: {
                        name: dto.name,
                        email: dto.email,
                        password: hashedPassword,
                        role: 'GYM_OWNER',
                    },
                },
            },
            include: {
                users: true,
            }
        })

        return {
            id: gym.id,
            name: gym.name,
            slug: gym.slug,
        };


    }

    async login (dto: LoginDto) {

        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            }
        })

        if (!user) {
            throw new UnauthorizedException(
                'Invalid credentials',
            );
        }           

        const isPasswordValid = await bcrypt.compare(
            dto.password,
            user.password
        )

        if(!isPasswordValid) {
            throw new UnauthorizedException(
                'Invalid credentials',
            );
        }

        return {
            message: 'Login Success',
            user:{
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.email,
                gymId: user.gymId,
            }
        }
    }
}