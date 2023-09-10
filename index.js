const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());
const cache = require('./nodecache')(300); // Pass the cache duration as a parameter

app.get('/getdata', cache, async (req, res) => {
    try {
        const start = Date.now();
        const result = await axios.get("https://jsonplaceholder.typicode.com/comments");
        const end = Date.now();
        console.log(end - start);
        res.json(result.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
