const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');

// Search for gifts
router.get('/', async (req, res, next) => {
    try {
        // Task 1: Connect to MongoDB using connectToDatabase database.
        const db = await connectToDatabase(); // Connects to the database

        const collection = db.collection("gifts");

        // Initialize the query object
        let query = {};

        // Task 2: Add the name filter to the query if the name parameter is not empty
        if (req.query.name && req.query.name.trim() !== '') {
            query.name = { $regex: req.query.name, $options: "i" }; // Using regex for partial match, case-insensitive
        }

        // Task 3: Add other filters to the query
        if (req.query.category) {
            query.category = req.query.category;
        }
        if (req.query.condition) {
            query.condition = req.query.condition;
        }
        if (req.query.age_years) {
            query.age_years = { $lte: parseInt(req.query.age_years) }; // Only include gifts younger than or equal to the specified age_years
        }

        // Task 4: Fetch filtered gifts using the find(query) method.
        const gifts = await collection.find(query).toArray(); // Fetches gifts based on the constructed query

        res.json(gifts); // Returns the filtered gifts as a JSON array
    } catch (e) {
        console.error('Error fetching gifts:', e);
        next(e); // Passes errors to the next middleware (possibly error handling middleware)
    }
});


module.exports = router;
