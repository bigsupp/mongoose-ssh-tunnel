require('dotenv').config()

const ssh_config = {
  username: process.env.SSH_USERNAME,
  password: process.env.SSH_PASSWORD,
  host: process.env.SSH_HOST,
  port: process.env.SSH_PORT || "22",
  dstHost: "localhost",
  dstPort: "27017",
  localHost: "127.0.0.1",
  localPort: "27000"
}

const mongoose = require('mongoose')
const tunnel = require('tunnel-ssh')

tunnel(ssh_config, (err, server) => {
  const db = mongoose.createConnection('mongodb://127.0.0.1:27000/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  db.once('open', () => {

    console.log('DB Connected');
    db.db.stats((err, stats) => {
      console.log('db.stats():', stats)
    })

  })
})