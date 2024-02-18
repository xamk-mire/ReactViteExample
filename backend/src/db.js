import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    user: "postgres",
    password: "Hd6470M",
    host: "localhost",
    port: 5432,
    database: "testDB"
});

export default pool;