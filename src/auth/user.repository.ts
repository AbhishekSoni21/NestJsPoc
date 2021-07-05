import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ConflictException } from '@nestjs/common';
import { throwError } from 'rxjs';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const user = this.create({ username, password });
    try {
      await this.save(user);
    } catch (error) {
      console.log('errrror', error);
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new ConflictException();
      }
    }
  }
}
