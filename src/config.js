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
   * These credentials are for a free Postgres Cluster on Elephant SQL
   */
  db_cloud: {
    host: 'tai.db.elephantsql.com',
    port: 5432,
    user: 'jnogztoy',
    password: 'tA9SDQpMvXInS2IX0u49whCqsoVW-flA',
    database: 'jnogztoy',
  }
};

module.exports = config;