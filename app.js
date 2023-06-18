const Joi = require('joi')
const express = require('express');
const app = express();

const courses = [
    {id: 1, name: 'JavaScript'},
    {id: 2, name: 'C++'},
    {id: 3, name: 'PHP'},
];

app.get('/', (req, res) => {
    res.send('Hello World!');
    console.log('Hello World!!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses)
});

app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    }

    const result = Joi.ValidationError(req.body, schema);
    console.log(result);

    if (result.error) 
    console.log(result.error.details[0].message);
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('Course not found');

    const schema = {
        name: Joi.string().min(3).required()
    }
    
    const result = Joi.ValidationError(req.body, schema);
    if (result.error) 
    console.log(result.error.details[0].message);

    course.name = req.body.name;
    res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('Course not found');
    res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listining on port ${port}....`));