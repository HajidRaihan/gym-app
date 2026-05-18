import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { AuthGuard } from '../modules/auth/guards/auth.guard';
import { RolesGuard } from '../modules/auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('GYM_OWNER')
  findAll() {
    return ['member 1'];
  }

  @Get('me')
  @UseGuards(AuthGuard)
  getme(@CurrentUser() user: any) {
    return user;
  }
}
