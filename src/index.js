const express = require('express');
const app     = express();
const port    = 8080;
const square = require("./lib/square")

app.disable("x-powered-by")

app.get('/', (req, res) => {
    res.send("hello world");
});

app.get('/square/:nb', (req, res) => {
	const nb = req.params.nb
	res.send(square(parseInt(nb)).toString());
});

let server;

server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = {
    app,
    closeServer: () => {
        server.close();
    }
};