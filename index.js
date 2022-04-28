const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@volunteer-network.54muj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {
        await client.connect();
        const volunteerCollection = client.db('VolunteerNetwork').collection('volunteer');
        const eventCollection = client.db('VolunteerNetwork').collection('event');

        // GET ALL VOLUNTEER
        app.get('/volunteer', async (req, res) => {
            const query = {};
            const cursor = volunteerCollection.find(query);
            const volunteers = await cursor.toArray();
            res.send(volunteers);
        })

        // GET SINGLE VOLUNTEER
        app.get('/volunteer/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const volunteer = await volunteerCollection.findOne(query);
            res.send(volunteer);
        })

        // POST SINGLE USER
        app.post('/event', async (req, res) => {
            const add = req.body;
            const result = await eventCollection.insertOne(add);
            res.send(result)
        })

        // GET ALL POST
        app.get('/event', async (req, res) => {
            const query = {};
            const cursor = eventCollection.find(query);
            const event = await cursor.toArray();
            res.send(event);
        })

    }
    finally {

    }
}
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Volunteer Network Server')
});

app.listen(port, (req, res) => {
    console.log('Volunteer Network Server Running', port);
});


