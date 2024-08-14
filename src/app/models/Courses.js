const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Course = new Schema({
    name: {
        type: String,
        maxLength: 255,
        required: true
    },
    description: {
        type: String,
        maxLength: 600,
    },
    image: {
        type: String,
        maxLength: 255,
    },
    videoId: {
        type: String,
        maxLength: 255,
        required: true
    },
    level: {
        type: String,
        maxLength: 255,
    },
    slug: {
        type: String,
        slug: 'name', // slug này sẽ lấy trường name và như sau: vd: hoc-lap-trinh-Node-JS
        unique: true, // slug duy nhat khong trung nhau
    },
}, {
    timestamps: true
});

// add plugins
mongoose.plugin(slug);
Course.plugin(mongooseDelete, { 
    deletedAt: true,
    overrideMethods: 'all',
}); // soft delete

module.exports = mongoose.model('Course' // tạo một collection với tên là dạng số nhiều của tên model (trong trường hợp này là courses).
                                , Course);
