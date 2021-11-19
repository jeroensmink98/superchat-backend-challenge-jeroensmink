const env = process.env;

const config = {
  db: {
    host: 'postgres',
    port: 5432 ,
    user: 'postgres' ,
    password: 'newPassword' ,
    database: 'superchat' ,
  },
  /**
   * These credentials are for a free Postgres Cluster on Elephant SQL I used during development
   */
  db_cloud: {
    host: '*************',
    port: 5432,
    user: '************',
    password: '*****************',
    database: '************',
  }
};

module.exports = config;