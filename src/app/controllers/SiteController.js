
const Course = require('../models/Courses');
const { multipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    // [GET] /   - home
    index(request, response, next) {
        Course.find({})
                .then(courses => {
                    response.render('home', {
                        courses: multipleMongooseToObject(courses)
                    });
                })
                .catch(error => next(error));    // or use .catch(next)
    }

    // [GET] /search
    search(request, response) {
        response.render('search');
    }
}

module.exports = new SiteController();
