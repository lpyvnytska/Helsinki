require('dotenv').config()

let MONGO_URL = process.env.MONGO_URL
let TEST_MONGODB_URI = process.env.TEST_MONGODB_URI
let PORT = process.env.PORT

module.exports = {
    MONGO_URL,
    TEST_MONGODB_URI,
    PORT
}