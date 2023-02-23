const { Router } = require('express');
const controller = require('./controller');

const router = Router();

// This was to test that route works
// router.get('/', (req,res) => {
//     res.send("using API route");
// });


router.get('/', controller.getStudents); 

router.post('/', controller.addStudent);

router.get('/:id', controller.getStudentById);

router.delete('/:id', controller.deleteStudentById);

router.put('/:id', controller.updateStudentById);






module.exports = router;

// So what I am doing here is creating Router object, adding routes to it, and the I am going to export this Router and I am going to import Router over to app.js