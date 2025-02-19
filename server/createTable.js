const mysql = require('mysql2/promise');

async function createTable() {
    const connection = await mysql.createConnection({
        host: 'turntable.proxy.rlwy.net',
        user: 'root',
        password: 'ILkwVgUborPXccRSCImBgxohCGsZQXdf',
        database: 'railway',
        port: 19067
    });

    await connection.execute(`
        CREATE TABLE users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
        )
    `);

    console.log('Tabela utworzona!');
    await connection.end();
}

createTable();