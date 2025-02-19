const mysql = require('mysql2/promise');

async function createConnection() {
    const connection = await mysql.createConnection({
        host: 'turntable.proxy.rlwy.net',
        user: 'root',
        password: 'ILkwVgUborPXccRSCImBgxohCGsZQXdf',
        database: 'railway',
        port: 19067,
        authPlugins: {
            mysql_clear_password: () => () => Buffer.from('ILkwVgUborPXccRSCImBgxohCGsZQXdf')
        }
    });

    console.log('Połączenie udane!');
    await connection.end();
}

createConnection();