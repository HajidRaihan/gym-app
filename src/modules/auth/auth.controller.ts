import { Body, Controller, Post } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { RegisterOwnerDto } from "./dto/register-owner.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register-owner')
    registerOwner(@Body() dto: RegisterOwnerDto) {
        return this.authService.registerOwner(dto);
    }
}