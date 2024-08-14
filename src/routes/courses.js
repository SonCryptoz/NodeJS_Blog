const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');

router.get('/create', courseController.create); // read
router.post('/store', courseController.store); // add
router.post('/handle-form-actions', courseController.handleFormActions); 
router.get('/:id/edit', courseController.edit);
router.put('/:id', courseController.update); // PUT - update all field
router.patch('/:id/restore', courseController.restore); // PATCH - update one field
router.delete('/:id', courseController.delete); // delete
router.delete('/:id/force', courseController.forceDelete); // delete
router.get('/:slug', courseController.show);

module.exports = router;