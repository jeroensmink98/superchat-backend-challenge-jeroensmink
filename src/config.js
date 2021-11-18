const env = process.env;

const config = {
  db: {
    host: 'postgres' ,
    port: 5432 ,
    user: 'postgres' ,
    password: 'newPassword' ,
    database: 'superchat',
  },
};

module.exports = config;