const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: 'JavaScript'},
    {id: 2, name: 'C++'},
    {id: 3, name: 'PHP'},
];

app.get('/', (req, res) => {
    res.send('Abdure');
    console.log('Hello World!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses)
});

app.get('/api/courses/:id', (req, res) => {
    // Check if course found
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course not found');
    res.send(course);
});



app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;}

    const course = { 
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
//     Check if the id is found
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course not found');
        
//     Validation
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

//      Update 
    course.name = req.body.name
    res.send(course);
});

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(course);
}

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course with given id not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});



// Environment Variable
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listining on port ${3000}....`));