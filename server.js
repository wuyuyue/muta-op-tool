const express = require('express')
const next = require('next')
// const basicAuth = require('express-basic-auth')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const {spawn} = require('child_process')

app.prepare().then(() => {
  const server = express()
  // server.use(basicAuth({
  //   users: { 'muta': 'muta' }
  // })); 
  server.use(express.json())
  server.post('/command', (req, res) => {
    // console.log(req.headers)
    console.log(req.body)
   
    const ps = spawn('ipconfig', []);
    res.setHeader('Transfer-Encoding', 'chunked');

    ps.stdout.on('data', (d) => {
      res.write(d)
    });
    
    ps.stderr.on('data', (d) => {
      res.write(d)
    });
    ps.on('close', () => {
      res.end()
    });
  })

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})