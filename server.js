const express = require('express')
const next = require('next')
// const basicAuth = require('express-basic-auth')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const {spawn} = require('child_process')
const fs = require('fs')
const path = require('path')
const commandDir = '/home/op/huobi_test_script/'
const jsonFile = 'shake.json'
const exec = `${commandDir}fabfile.py`
app.prepare().then(() => {
  const server = express()
  // server.use(basicAuth({
  //   users: { 'muta': 'muta' }
  // })); 
  server.use(express.json())
  server.post('/command', (req, res) => {
    // console.log(req.headers)
    const command = req.body.command
    console.log(command)

    try {
      res.setHeader('Content-Type', 'text/html; charset=UTF-8');
      res.setHeader('Transfer-Encoding', 'chunked');
      fs.writeFileSync(path.join(commandDir,jsonFile),JSON.stringify(command))
      const ps = spawn('python', [exec]);
  
      ps.stdout.on('data', (d) => {
        res.write(d)
      });
      
      ps.stderr.on('data', (d) => {
        res.write(d)
      });
      ps.on('close', (data) => {
        res.write('0\r\n\r\n')
        res.end()
      });
    }catch(e){
      res.write(e.message)
      res.write('0\r\n\r\n')
      res.end()
    }
    
  })

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})