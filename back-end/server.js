const express = require('express');
const app = new express();

app.use(express.json());

const PORT = 8080;

app.listen(PORT,
     () => console.log(`Server has started on http://localhost:8080`));

app.get('/training', (req, res) =>{
    res.status(200).send("Hello");
})

