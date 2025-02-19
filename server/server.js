const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database'); // Załaduj konfigurację bazy danych

app.use(bodyParser.json());

// Endpoint rejestracji
app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;

    // Zapytanie do bazy danych w celu dodania użytkownika
    const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;

    connection.query(query, [username, email, password], (err, results) => {
        if (err) {
            console.error('Błąd przy dodawaniu użytkownika: ', err);
            return res.status(500).json({ error: 'Błąd przy rejestracji' });
        }
        res.status(200).json({ message: 'Użytkownik zarejestrowany pomyślnie!' });
    });
});

// Uruchomienie serwera
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});