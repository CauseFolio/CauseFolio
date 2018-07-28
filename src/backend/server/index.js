const express = require('express')
const app = express()
const bodyParser = require('body-parser')

//serve static file
app.use(bodyParser.json());

app.listen(2000, () => {
  console.log('listening on port 2000')
})

export default app;
