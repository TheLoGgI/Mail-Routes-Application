const fs = require('fs')
const lineReader = require('line-reader');
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.use('/public', express.static('public')) // Stores static files in 'public' folder at '/'
app.use(express.json())
app.listen(3000, () => console.log('App listening on port 3000!'))

// localhost:3000 //ROOT
app.get('/', (req, res, next) => {
  res.render('index')
})

// const urlencodedParser = bodyParser.urlencoded({ extended: false })
const jsonParser = bodyParser.json()

app.post('/api/routes', jsonParser, (req, res) => {
  const routeList = []
  if (!req.body.route) {
    res.send('requst not specified')
  }
  lineReader.eachLine('./public/MailRoutes/route' + req.body.route + '.txt', (line, last) => {
    //If lines with no content
    if (!/module/i.test(line) && !/\*\*/i.test(line)) {
      // Split each row in roadnames, and house numbers in an array
      let vej = line.split(/,|:/g)
      // For every array the first index is the roadname, and the folllowing numbers
      for (let i = 1; i < vej.length; i++) {
        let str = `${vej[0].trim()} ${vej[i].trim()}`
        //Push the string to our route list
        routeList.push(str)
      }
    }

    if (last) {
      res.status(200).send(routeList)
    }

  })

})
