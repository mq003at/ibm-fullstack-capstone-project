require('dotenv').config();
const express = require('express');
const axios = require('axios');
const logger = require('./logger');
const expressPino = require('express-pino-logger')({ logger });
// Task 1: Import the natural library
const natural = require('natural');
const express = require('express');
const logger = require('pino')();

// Task 2: Initialize the express server
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Task 3: Create the POST /sentiment analysis route
app.post('/sentiment', async (req, res) => {
    // Task 4: Extract the sentence parameter
    const { sentence } = req.query;

    if (!sentence) {
        logger.error('No sentence provided');
        return res.status(400).json({ error: 'No sentence provided' });
    }

    // Initialize the sentiment analyzer with Natural's PorterStemmer and "English" language
    const Analyzer = natural.SentimentAnalyzer;
    const stemmer = natural.PorterStemmer;
    const analyzer = new Analyzer("English", stemmer, "afinn");

    // Perform sentiment analysis
    try {
        const analysisResult = analyzer.getSentiment(sentence.split(' '));

        let sentiment = "neutral";

        // Task 5: Set sentiment to negative or positive based on score rules
        if (analysisResult > 0) {
            sentiment = 'positive';
        } else if (analysisResult < 0) {
            sentiment = 'negative';
        }

        // Logging the result
        logger.info(`Sentiment analysis result: ${analysisResult}`);

        // Task 6: Send a status code of 200 with both sentiment score and the sentiment text in the format { sentimentScore: analysisResult, sentiment: sentiment }
        res.status(200).json({ sentimentScore: analysisResult, sentiment: sentiment });
    } catch (error) {
        logger.error(`Error performing sentiment analysis: ${error}`);

        // Task 7: If there is an error, return a HTTP code of 500 and the json {'message': 'Error performing sentiment analysis'}
        res.status(500).json({ message: 'Error performing sentiment analysis' });
    }
});

// Start the server
app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
});


app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});
