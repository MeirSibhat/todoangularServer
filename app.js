const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const toDoRoute= require('./routers/toDoRoute.js')
const mongodb= require('./mongoDb/connect.js')

app.all('*', function (req, res, next) {
  if (!req.get('Origin')) return next();
  // במציאות במקום כוכבית נכניס את הדומיינים האמיתיים שהצד לקוח נמצא בהם
  // כדי שלא כל אחד יוכל לבצע בקשות לשרת שלנו
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,x-auth-token');
  next();
});

// use bodyParser
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/todo',toDoRoute);
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})