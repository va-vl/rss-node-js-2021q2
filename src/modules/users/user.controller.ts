import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Inject,
  NotFoundException,
  SerializeOptions,
  UseInterceptors,
  ClassSerializerInterceptor,
  InternalServerErrorException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
//
import { CreateUserDTO } from './input/create-user.dto';
import { UpdateUserDTO } from './input/update-user.dto';
import { UserService } from './user.service';
import { UserID } from './input/user-id.input';

@Controller('users')
@SerializeOptions({ strategy: 'excludeAll' })
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async getById(@Param() input: UserID) {
    const user = await this.userService.getById(input.id);

    if (user === undefined) {
      throw new NotFoundException();
    }

    return user;
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() createUserDTO: CreateUserDTO) {
    let user;

    try {
      user = await this.userService.create(createUserDTO);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }

    return user;
  }

  @Put(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async update(@Param() input: UserID, @Body() updateUserDTO: UpdateUserDTO) {
    const user = await this.userService.update(input.id, updateUserDTO);

    if (user === undefined) {
      throw new NotFoundException();
    }

    return user;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() input: UserID) {
    const isUserRemoved = await this.userService.remove(input.id);

    if (!isUserRemoved) {
      throw new NotFoundException();
    }
  }
}
