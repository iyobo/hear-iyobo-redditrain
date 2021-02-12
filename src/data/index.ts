import {MikroORM} from '@mikro-orm/core';
import DBConfig from './DBConfig';

export let orm: MikroORM;
export const initializeDatabase = async ()=>{
  orm = await MikroORM.init(DBConfig);

}

export const newOrmFork = ()=>{
  return orm.em.fork();
}