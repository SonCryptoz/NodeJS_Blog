
const Course = require('../models/Courses');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
    // [GET] /courses/:slug
    show(request, response, next) {
        Course.findOne({ slug: request.params.slug })
                .then(course => {
                    response.render('courses/show', {
                        course: mongooseToObject(course)
                    });
                })
                .catch(next);
        
    }

    // [GET] /courses/create
    create(request, response, next) {
        response.render('courses/create');
    }

    // [POST] /courses/store
    store(request, response, next) {
        const formData = request.body;
        formData.image = `https://img.youtube.com/vi/${request.body.videoId}/sddefault.jpg`;
        const course = new Course(formData);
        course.save()
                .then(() => response.redirect('/'))
                .catch(next);
    }

    // [GET] /courses/:id/edit
    edit(request, response, next) {
        Course.findById({_id: request.params.id})
        .then(course => response.render('courses/edit', {
            course: mongooseToObject(course)
        }))
        .catch(next);
    }

    // [PUT] /courses/:id
    update(request, response, next) {
        Course.updateOne({_id: request.params.id}, request.body)
                .then(() => response.redirect('/me/stored/courses'))
                .catch(next);
    }

    // [DELETE] /courses/:id
    
    // xóa cứng
    // delete(request, response, next) {
    //     Course.deleteOne({_id: request.params.id})
    //             .then(() => response.redirect('back'))
    //             .catch(next);
    // }

    // xóa mềm (không xóa hẳn mà vẫn còn trong database)
    delete(request, response, next) {
        Course.delete({_id: request.params.id})
                .then(() => response.redirect('back'))
                .catch(next);
    }

    // [DELETE] /courses/:id/force
    // xóa hẳn
    forceDelete(request, response, next) {
        Course.deleteOne({_id: request.params.id})
                .then(() => response.redirect('back'))
                .catch(next);
    }


    // [PATCH] /courses/:id/restore
    // khôi phục
    restore(request, response, next) {
        Course.restore({ _id: request.params.id })
            .then(() => {
                // Sau khi khôi phục, cập nhật deleted và deletedAt
                return Course.updateOne({ _id: request.params.id }, {
                    $set: {
                        deleted: false,
                        deletedAt: null
                    }
                });
            })
            .then(() => response.redirect('back'))
            .catch(next);
    }
    
    // [POST] /courses/handle-form-actions
    handleFormActions(request, response, next) {
        switch (request.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: request.body.courseIds } })
                        .then(() => response.redirect('back'))
                        .catch(next);
                break;
            case 'restore':
                Course.restore({_id: {$in: request.body.courseDeletedIds}})
                        .then(() => {
                            // Sau khi khôi phục, cập nhật deleted và deletedAt
                            return Course.updateMany({_id: {$in: request.body.courseDeletedIds}}, {
                                $set: {
                                    deleted: false,
                                    deletedAt: null
                                }
                            });
                        })
                        .then(() => response.redirect('back'))
                        .catch(next);
                break;
            case 'deleteForce':
                Course.deleteMany({ _id: { $in: request.body.courseDeletedIds } })
                        .then(() => response.redirect('back'))
                        .catch(next);
                break;
            default:
                response.json({
                    message: 'Invalid action',
                });
        }
    }
}

module.exports = new CourseController();
