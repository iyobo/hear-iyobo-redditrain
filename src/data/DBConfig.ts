import {User} from './models/User';
import {Options} from '@mikro-orm/core';
import {UserSubreddit} from './models/UserSubreddit';
import {UserSchedule} from './models/UserSchedule';

export default {
  entities: [User, UserSubreddit, UserSchedule],
  dbName: 'redditRainDB',
  type: 'sqlite',
  migrations: {
    tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
    path: `${__dirname}/migrations`, // path to the folder with migrations
    pattern: /^[\w-]+\d+\.ts$/, // regex pattern for the migration files
    transactional: true, // wrap each migration in a transaction
    disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
    allOrNothing: true, // wrap all migrations in master transaction
    dropTables: true, // allow to disable table dropping
    safe: false, // allow to disable table and column dropping
    emit: 'ts', // migration generation mode
  },
} as Options;

