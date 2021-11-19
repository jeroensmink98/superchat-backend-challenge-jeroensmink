const env = process.env;

const config = {
  db: {
    host: 'postgres',
    port: 5432 ,
    user: 'postgres' ,
    password: 'newPassword' ,
    database: 'superchat' ,
  },
  db_local: {
    host: 'tai.db.elephantsql.com',
    port: 5432,
    user: 'jnogztoy',
    password: 'tA9SDQpMvXInS2IX0u49whCqsoVW-flA',
    database: 'jnogztoy',
  }
};

module.exports = config;