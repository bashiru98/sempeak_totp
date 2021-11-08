const mongoose = require('mongoose');

const connectDB = async () => {
    try {
      
        const conn = await mongoose.connect('mongodb+srv://bashiru:FnFqXlXzRiriBt2F@cluster0.ap1k6.mongodb.net/sempeak_totp?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
          });
        
          console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("error",error);
        console.log("db fatal error")
    }
 
};

module.exports = connectDB;