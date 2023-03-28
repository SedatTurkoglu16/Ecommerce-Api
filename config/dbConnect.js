const { default: mongoose } = require('mongoose');

const dbConnect = () => {
    try {
        const connection = mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log("database connected succesfully");
    } catch (error) {
        console.log("Database connection error.");
    }
}

module.exports = dbConnect;