import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRole, User } from './entities/user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let serviceMock: jest.Mocked<UsersService>;

  const mockUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: '123456',
    role: UserRole.STUDENT,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockUsersService: jest.Mocked<Partial<UsersService>> = {
    findAll: jest.fn().mockResolvedValue([mockUser]),
    findOne: jest.fn().mockResolvedValue(mockUser),
    create: jest.fn().mockResolvedValue(mockUser),
    update: jest.fn().mockResolvedValue(mockUser),
    remove: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    serviceMock = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all users', async () => {
    const users = await controller.findAll();
    expect(users).toEqual([mockUser]);
    expect(serviceMock.findAll).toHaveBeenCalled();
  });

  it('should return a single user', async () => {
    const user = await controller.findOne('1');
    expect(user).toEqual(mockUser);
    expect(serviceMock.findOne).toHaveBeenCalledWith(1);
  });

  it('should create a user', async () => {
    const newUser = await controller.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
      role: UserRole.STUDENT,
    });
    expect(newUser).toEqual(mockUser);
    expect(serviceMock.create).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
      role: UserRole.STUDENT,
    });
  });

  it('should update a user', async () => {
    const updatedUser = await controller.update('1', { name: 'Jane Doe' });
    expect(updatedUser).toEqual(mockUser);
    expect(serviceMock.update).toHaveBeenCalledWith(1, { name: 'Jane Doe' });
  });

  it('should remove a user', async () => {
    const removedUser = await controller.remove('1');
    expect(removedUser).toEqual(mockUser);
    expect(serviceMock.remove).toHaveBeenCalledWith(1);
  });
});
