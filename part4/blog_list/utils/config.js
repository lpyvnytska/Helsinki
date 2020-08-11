require('dotenv').config()

let MONGO_URL = process.env.MONGO_URL
let PORT = process.env.PORT

module.exports = {
    MONGO_URL,
    PORT
}