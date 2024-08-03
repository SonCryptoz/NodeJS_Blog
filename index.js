const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000

// morgan
app.use(morgan('combined'))

// định nghĩa route '/'
app.get('/', (req, res) => {
    return res.send('Hello World!')
})

// 127.0.0.1 - localhost
app.listen(port, () => 
    console.log(`Example app listening at http://localhost:${port}`))



