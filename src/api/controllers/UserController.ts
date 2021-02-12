import {Body, Controller, Post} from 'koa-ts-controllers';
import {newOrmFork} from '../../data';
import {User} from '../../data/models/User';

@Controller('/user')
export class UserController {

  @Post('/')
  async newStat(@Body() body) {
    const em = newOrmFork();
    const users = em.getRepository(User)
    return users.findAll();
  }
}