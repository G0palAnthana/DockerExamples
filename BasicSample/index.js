const express = require('express');

const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: "Node Js"},
    {id: 2, name: "Express Js"},
    {id: 3, name: "Ldap Js"},
    {id: 4, name: "Nodemon Js"}
]

app.get('/', (req,res) => {
    res.send('Hello World!!!');
});

app.get('/api/courses', (req,res)=> {
  res.send(courses);
});;
    
app.get('/api/courses/:id', (req,res) => {
    const course =  courses.find(c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send('The course was not found');
    res.send(course);
});

app.post('/api/courses', (req,res) => {

    if(!req.body.name || req.body.name.length==0)
    {
        res.status(400).send('invalid Name')
        return;
    }
    const newCourse = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(newCourse);
    res.send(courses);
});

app.put('/api/courses/:id', (req,res) => {
    const course =  courses.find(c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send('The course was not found');

    //VALIDATION

    //Update Course
    course.name = req.body.name;
    //return updated curse
    res.send(course);
});

app.delete('/api/courses/:id', (req,res) => {
    const course =  courses.find(c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send('The course was not found');

    const index = courses.indexOf(course);
    courses.slice(index,1);

    res.send(courses);
});

//process.env.PORT || 3000;
const port = process.env.port || 3000;
//app.listen(port, () => console.log('listing port {port}'));
app.listen(3000, () => console.log('listing port 3000'));