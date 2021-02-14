import {MikroORM} from '@mikro-orm/core';
import DBConfig from './DBConfig';

export let orm: MikroORM;
export const initializeDatabase = async ()=>{
  orm = await MikroORM.init(DBConfig);

}

export const forkEntityManager = ()=>{
  return orm.em.fork();
}

/**
 * For look ups only.
 * For updates, use `forkEntityManager()`
 */
export const getMainEntityManager = ()=>{
  return orm.em;
}