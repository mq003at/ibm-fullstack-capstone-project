router.get('/', async (req, res) => {
    try {
        // Task 1: Connect to MongoDB and store connection to db constant
        const db = await connectToDatabase(); // Connects to the database

        // Task 2: Use the collection() method to retrieve the gift collection
        const collection = db.collection("gifts"); // Accesses the 'gifts' collection

        // Task 3: Fetch all gifts using the collection.find method. Chain with toArray method to convert to JSON array
        const gifts = await collection.find({}).toArray(); // Fetches all documents in the 'gifts' collection

        // Task 4: Return the gifts using the res.json method
        res.json(gifts); // Sends the array of gifts as JSON to the client
    } catch (e) {
        console.error('Error fetching gifts:', e);
        res.status(500).send('Error fetching gifts');
    }
});


router.get('/:id', async (req, res) => {
    try {
        // Task 1: Connect to MongoDB and store connection to db constant
        const db = await connectToDatabase(); // Connects to the database

        // Task 2: Use the collection() method to retrieve the gift collection
        const collection = db.collection("gifts"); // Accesses the 'gifts' collection

        const id = req.params.id; // Retrieves the id from the request parameters

        // Task 3: Find a specific gift by ID using the collection.findOne method and store in constant called gift
        const gift = await collection.findOne({ _id: id }); // Finds a specific gift by ID

        if (!gift) {
            return res.status(404).send('Gift not found'); // Sends a 404 error if no gift is found
        }

        res.json(gift); // Sends the found gift as JSON to the client
    } catch (e) {
        console.error('Error fetching gift:', e);
        res.status(500).send('Error fetching gift'); // Handles any server errors
    }
});




// Add a new gift
router.post('/', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        const gift = await collection.insertOne(req.body);

        res.status(201).json(gift.ops[0]);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
