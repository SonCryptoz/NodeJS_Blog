const mongoose = require('mongoose');

function connect(){
    mongoose.connect('mongodb://127.0.0.1:27017/blog_education_dev')
            .then(() => console.log('Connected to MongoDB'))
            .catch(error => console.log('can not access data base', error));
}

module.exports = { connect };
