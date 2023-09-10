// nodecache.js
const NodeCache = require('node-cache');
const cache = new NodeCache();

module.exports = (duration) => (req, res, next) => {
    const key = req.originalUrl;
    const cachedData = cache.get(key);

    if (cachedData) {
        console.log('Cache hit for ' + key);
        res.json(cachedData);
    } else {
        console.log('Cache miss for ' + key);
        console.log('Fetching data and storing it in the cache');
        
        // Override res.json to cache the response
        res.originalJson = res.json;
        res.json = (body) => {
            cache.set(key, body, duration);
            res.originalJson(body);
        };

        // Continue processing the request
        next();
    }
};
