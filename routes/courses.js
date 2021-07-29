
const Joi = require('joi');
const express = require('express');
const router = express.Router();
let coursesList = [
    { id: 1, name: 'Course 1' },
    { id: 2, name: 'Course 2' },
    {id:3,name:'Course 3'}
]
router.get('/', (req, res) => {
    res.send(coursesList);
});
router.get('/:id', (req, res) => {
    const course = coursesList.find(course => course.id === +(req.params.id));
    if (!course) return res.status(404).send('No course found with the given ID');
    res.send(course);
});
router.post('/', (req, res) => {
    //validate name property in normal way
        // if (!req.body.name || typeof (req.body.name) !== 'string' || (req.body.name.length > 3)) {
        //     res.status(400).send('Name is required with maximum length 3 charachters');      
        //     return;
        // }
    //validate name property using joi package
    const {error} = validateCourse(req.body)
    if (error) return res.status(400).send(error);      
    const newCourse = { id: coursesList.length + 1, name: req.body.name };
    coursesList.push(newCourse);
    res.send(newCourse);
});
router.put('/:id', (req,res) => {
    const course = coursesList.find(course => course.id === +(req.params.id));
    //No course found with the given ID
    if (!course) return res.status(404).send('No course found with the given ID');
    //Validate the name
    const {error} = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Update the name
    course.name = req.body.name;
    res.send(course);
})

router.delete('/:id', (req,res) => {
    const course = coursesList.find(course => course.id === +(req.params.id));
    //No course found with the given ID
    if (!course) return res.status(404).send('No course found with the given ID');
    //Delete
    const courseIndex = coursesList.indexOf(course);
    coursesList.splice(courseIndex, 1);
    res.send(course);
})

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().max(3).required()
    })
    return schema.validate(course);
}

module.exports = router;