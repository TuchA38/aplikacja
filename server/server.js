const express = require('express');
const cors = require('cors'); // Dodaj import
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database'); // Załaduj konfigurację bazy danych

// Konfiguracja CORS
const corsOptions = {
    origin: 'https://tm-patryk-piszczek.great-site.net', // Pozwól na połączenia tylko z tej domeny
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions)); // Użyj CORS

app.use(bodyParser.json());

// Endpoint rejestracji
app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;

    // Sprawdzanie, czy login lub email już istnieją w bazie
    const checkQuery = `SELECT * FROM users WHERE username = ? OR email = ?`;

    connection.query(checkQuery, [username, email], (err, results) => {
        if (err) {
            console.error('Błąd przy sprawdzaniu użytkownika: ', err);
            return res.status(500).json({ error: 'Błąd przy sprawdzaniu danych użytkownika' });
        }

        if (results.length > 0) {
            // Użytkownik już istnieje
            return res.status(400).json({ exists: true });
        }

        // Zapytanie do bazy danych w celu dodania użytkownika
        const insertQuery = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;

        connection.query(insertQuery, [username, email, password], (err, results) => {
            if (err) {
                console.error('Błąd przy dodawaniu użytkownika: ', err);
                return res.status(500).json({ error: 'Błąd przy rejestracji' });
            }
            res.status(200).json({ message: 'Użytkownik zarejestrowany pomyślnie!' });
        });
    });
});

// Uruchomienie serwera
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});