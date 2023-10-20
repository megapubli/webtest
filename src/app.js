const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const http = require('http'); // Usamos http em vez de https
const port = process.env.PORT || 1000;

//////// CONFIGURATION ///////////

// Se você ainda tiver as chaves SSL, pode mantê-las aqui, mas não é necessário para um ambiente local.
// const options = {
//     key: fs.readFileSync(path.join(__dirname, '..', 'ssl', 'key.pem'), 'utf-8'),
//     cert: fs.readFileSync(path.join(__dirname, '..', 'ssl', 'cert.pem'), 'utf-8')
// };

////////////////////////////

require('./routes')(app);

const httpServer = http.createServer(app); // Usamos http.createServer em vez de https.createServer
const io = require('socket.io')(httpServer);
require('./socketController')(io);

httpServer.listen(port, () => {
    console.log(`listening on port ${port}`);
});
