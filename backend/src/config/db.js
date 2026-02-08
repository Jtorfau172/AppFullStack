const mongoose = require('mongoose');

const conectarDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conectando ...');
    }catch(error){
        console.error('Error: ',error.message);
        process.exit(1);
    }
};

module.exports = conectarDB;