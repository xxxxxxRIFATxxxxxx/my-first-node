const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());


// MongoDB
const uri = "mongodb+srv://xxxxxxRIFATxxxxxx:xxxxxxRIFATxxxxxx@cluster0.vwkey.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("test");
        const usersCollection = database.collection("devices");

        // GET API
        app.get('/users', async (req, res) => {
            const cursor = usersCollection.find({});
            const users = await cursor.toArray();
            res.send(users);
        });

        // DETAILS API
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = usersCollection.find({ _id: ObjectId(id) });
            const user = usersCollection.findOne(query);
            console.log("load user with id:", id);
            res.send(user);
        });

        // POST API
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            const result = await usersCollection.insertOne(newUser);

            console.log("Hitting the Post", req.body);
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
            res.json(result);
        });

        // DELETE API
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await usersCollection.deleteOne(query);
            console.log("deleting user with id:", result);
            res.json(result);
        });

    }

    finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello from node');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});