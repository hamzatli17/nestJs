var dbConfig = {
  synchronize: false,
  migrations:['migrations/*.js'],
  cli:{
    migrationsDir:'migrations',
  }
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['**/*.entity.js'],
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['**/*.entity.ts'],
      migrationsRun:true,
    });
    break;
    
  case 'production':
    Object.assign(dbConfig, {
      type: 'postgres',
      database: process.env.DATABASE_URL,
      entities: ['**/*.entity.js'],
      migrationsRun:true,
      ssl:{
        rejectUnauthoized:false
      }
    });
    break;
  default:
    throw new Error('unknown environment');
}

module.exports = dbConfig;
