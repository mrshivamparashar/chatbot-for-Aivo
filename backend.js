// Import required modules
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Database connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yourpassword',
  database: 'chatbot',
});

// Verify database connection
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Chat API endpoint
app.post('/api/chat', (req, res) => {
  const userQuery = req.body.query;

  // Example query to find a bot response
  const query = 'SELECT response FROM chatbot_responses WHERE query = ?';
  db.query(query, [userQuery], (err, results) => {
    if (err) {
      console.error('Error fetching data:', err.message);
      return res.status(500).send({ reply: 'Internal server error' });
    }

    const botReply = results.length ? results[0].response : 'I did not understand that.';
    res.send({ reply: botReply });
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});