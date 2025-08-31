import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let repoMock: jest.Mocked<Partial<Repository<User>>>;

  const mockUser: User = {
    id: 1,
    name: 'Test',
    email: 'test@test.com',
    password: '123456',
    role: UserRole.STUDENT,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRepo: jest.Mocked<Partial<Repository<User>>> = {
    find: jest.fn().mockResolvedValue([mockUser]),
    findOneBy: jest.fn().mockResolvedValue(mockUser),
    create: jest.fn().mockReturnValue(mockUser),
    save: jest.fn().mockResolvedValue(mockUser),
    update: jest.fn().mockResolvedValue({}),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockRepo },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repoMock = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all users', async () => {
    const users = await service.findAll();
    expect(users).toEqual([mockUser]);
    expect(repoMock.find).toHaveBeenCalled();
  });

  it('should find one user by id', async () => {
    const user = await service.findOne(1);
    expect(user).toEqual(mockUser);
    expect(repoMock.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should create a user', async () => {
    const user = await service.create(mockUser as any);
    expect(user).toEqual(mockUser);
    expect(repoMock.create).toHaveBeenCalledWith(mockUser);
    expect(repoMock.save).toHaveBeenCalledWith(mockUser);
  });

  it('should update a user', async () => {
    const updatedUser = await service.update(1, { name: 'Updated' });
    expect(updatedUser).toEqual(mockUser);
    expect(repoMock.update).toHaveBeenCalledWith(1, { name: 'Updated' });
    expect(repoMock.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should remove a user', async () => {
    await service.remove(1);
    expect(repoMock.delete).toHaveBeenCalledWith(1);
    expect(repoMock.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });
});
