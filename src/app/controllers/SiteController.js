const Courses = require('../models/Courses');
const Course = require('../models/Courses');

class SiteController {
    // [GET] /   - home
    async index(request, response) {
        try{
            const courses = await Courses.find();
            response.json(courses);
        }
        catch(error){
            response.status(400).json({message: error.message});
        }
    }

    // [GET] /search
    search(request, response) {
        response.render('search');
    }
}

module.exports = new SiteController();
