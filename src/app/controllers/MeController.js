
const Course = require('../models/Courses');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /me/stored/courses
    // tìm bản ghi và đếm bản ghi
    storedCourses(request, response, next) {
        let courseQuery = Course.find({});
        if(request.query.hasOwnProperty('_sort')){
            courseQuery = courseQuery.sort({
                [request.query.column]: request.query.type,

            });
        }
        Promise.all([courseQuery, Course.countDocumentsDeleted()])
                .then(([courses, deletedCount]) => 
                    response.render('me/stored-courses', {
                        deletedCount,
                        courses: multipleMongooseToObject(courses),
                    })
                )
                .catch(next);
    }

    // [GET] /me/trash/courses 
    // xem dữ liệu tạm thời bị xóa
    trashCourses(request, response, next) {
        let deletedCourseQuery = Course.findDeleted({});
        if(request.query.hasOwnProperty('_sort')){
            deletedCourseQuery = deletedCourseQuery.sort({
                [request.query.column]: request.query.type,
            });
        }
        deletedCourseQuery
                .then(courses => response.render('me/trash-courses', {
                    courses: multipleMongooseToObject(courses) 
                }))
                .catch(next);
    }
}

module.exports = new MeController();
