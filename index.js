const express = require('express');
const { xi } = require('globalsprak'); // Assuming 'globalsprak' provides xi functionality

const app = express();
const port = 3000;

// Your xi function to handle the API call
async function callXi(prompt, count) {
  const response = await xi(prompt, count); // calling xi with prompt and count
  return response;
}

// Endpoint to handle xi requests
app.get('/xi', async (req, res) => {
  const prompt = req.query.prompt; // Get prompt from query parameter
  if (!prompt) {
    return res.status(400).send('Please provide a prompt.');
  }

  const count = req.query.count ? parseInt(req.query.count) : 1; // Get count from query, default to 1 if not provided

  try {
    const response = await callXi(prompt, count);
    res.json({ xiResponse: response });
  } catch (error) {
    console.error('Error calling xi:', error);
    res.status(500).send('Error generating xi response.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
