import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard) // Protect this endpoint--> user routes in general need authentication
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard) // Protect this endpoint
  @Get()
  findAll(@Request() req: any) {
    // You can access the authenticated user via req.user
    console.log('Authenticated user:', req.user);
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard) // Protect this endpoint
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    // You might want to add authorization logic here (e.g., only owner or admin can see)
    // if (req.user.userId !== id && !req.user.roles?.includes('admin')) {
    //   throw new ForbiddenException();
    // }
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard) // Protect this endpoint
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req: any,
  ) {
    // Add authorization logic here (owner/admin)
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard) // Protect this endpoint
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    // Add authorization logic here (owner/admin)
    return this.usersService.remove(id);
  }
}
