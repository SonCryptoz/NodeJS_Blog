const mongoose = require('mongoose');

async function connect(){
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/blog_education_dev');
        console.log('connect database successfully!');
    }
    catch(error){
        console.log('failed to connect database!', error);
    }
}

module.exports = { connect };
