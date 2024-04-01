// HOST: The hostname of the database server; 'localhost' means the server is running on your local machine
export const HOST = "localhost";

// USER: The username used to authenticate with PostgreSQL
export const USER = "postgres";

// PASSWORD: The password for the database user
export const PASSWORD = "password";

// DB: The name of the database to connect to
export const DB = "contactDB";

// dialect: The type of SQL database, 'postgres' represents PostgreSQL
export const dialect = "postgres";

// pool: Configuration for the connection pool, which is a cache of database connections maintained so they can be reused
export const pool = {
  // max: Maximum number of connections in pool
  max: 5,

  // min: Minimum number of connections in pool
  min: 0,

  // acquire: Maximum time, in milliseconds, that pool will try to get connection before throwing error
  acquire: 30000,

  // idle: Maximum time, in milliseconds, that a connection can be idle before being released
  idle: 10000,
};
