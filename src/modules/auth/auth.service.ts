import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { RegisterOwnerDto } from "./dto/register-owner.dto";

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

        const gym = this.prisma.gym.create({
            data: {
                name: dto.name,
                slug: dto.gymSlug,
                
                users: {
                    create: {
                        name: dto.name,
                        email: dto.email,
                        password: dto.password,
                        role: 'GYM_OWNER',
                    },
                },
            },
            include: {
                users: true,
            }
        })

        return gym;


    }
}