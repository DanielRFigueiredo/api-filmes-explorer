require('express-async-errors');
const cors = require('cors');
const AppError = require('./utils/AppError');
const migrations = require('./database/sqlite/migration')

const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes')

const { UPLOAD_FOLDER } = require('./configs/upload')

migrations()

app.use(cors())
app.use('/', express.json())
app.use('/files', express.static(UPLOAD_FOLDER))
app.use('/', routes)

app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    })
  }
  console.error(error)

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  })

})




app.listen(port, () => console.log(`Listening on port ${port}`));


