const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Proxy endpoint
app.get('/proxy', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).send('URL is required');
  }

  try {
    const response = await axios.get(url);
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

// Basic search engine (using a simple API example)
app.get('/search', async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).send('Search query is required');
  }

  try {
    // Example: Using DuckDuckGo's Instant Answer API
    const response = await axios.get(`https://api.duckduckgo.com/?q=${query}&format=json`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching search results');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
