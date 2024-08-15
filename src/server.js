require('express-async-errors');
const migrations = require('./database/sqlite/migration')

const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes')


migrations()

app.use('/', express.json())
app.use('/', routes)





app.listen(port, () => console.log(`Listening on port ${port}`));


