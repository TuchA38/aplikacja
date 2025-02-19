const mysql = require('mysql2');

// Połączenie z bazą danych MySQL na InfinityFree
const connection = mysql.createConnection({
    host: process.env.MYSQLHOST, // Użycie zmiennej środowiskowej
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE
});

connection.connect((err) => {
    if (err) {
        console.error('Błąd połączenia z bazą danych: ', err.stack);
        return;
    }
    console.log('Połączono z bazą danych MySQL!');
});

module.exports = connection;