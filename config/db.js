const mongoose = require('mongoose')

async function connectMongoDB() {
   if(process.env.MONGO_URI) {
    try {
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("MongoDB Successfully Connected")
    } catch (error) {
        console.error("Unable to connect to mongoDB: ", error)
    }
   }
}

module.exports = connectMongoDB