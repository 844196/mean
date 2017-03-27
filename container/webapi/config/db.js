var mongoose = require('mongoose')
let uri = `mongodb://${process.env.DB_URI || 'localhost'}:${process.env.DB_PORT || 27017}/app`

mongoose.Promise = global.Promise
mongoose.connect(uri)

process.on('SIGINT', () => {
  mongoose.disconnect()
  process.exit(1)
})
