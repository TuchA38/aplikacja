const mysql = require('mysql2');

// Połączenie z bazą danych MySQL na InfinityFree
const connection = mysql.createConnection({
    host: process.env.DB_HOST, // Użycie zmiennej środowiskowej
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.error('Błąd połączenia z bazą danych: ', err.stack);
        return;
    }
    console.log('Połączono z bazą danych MySQL!');
});

module.exports = connection;