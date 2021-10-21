const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello from node');
});

const users = [
    { id: 0, name: "Abdul" },
    { id: 1, name: "Mokbul" },
    { id: 2, name: "Sokbul" },
    { id: 3, name: "Noodles" },
    { id: 4, name: "Pasta" },
];

app.get('/users', (req, res) => {
    const search = req.query.search;

    if (search) {
        const searchResult = users.filter(user => user.name.toLocaleLowerCase().includes(search));
        res.send(searchResult);
    }

    else {
        res.send(users);
    };
});

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const user = users[id];
    res.send(user);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});