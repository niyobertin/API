const express = require("express");
const bodyParser = require('body-parser');
const uuid = require('uuid');
const students = require("./students/students");

const app = express();
app.use(bodyParser.json());
//Getting all students
app.get("/api/students",(req,res) =>{
    res.send(students);
});

//Gettig unique student

app.get('/api/students/:id',(req,res) =>{
const id = parseInt(req.params.id);
const student = students.find(el => el.id === id);
if(student){
    res.send(student);
}else{
    res.status(400).send({msg:"bad request"})
}
});
// Adding student to a server;

app.post('/api/students',(req,res) =>{
    const body = req.body;
    const newStudent = {
        id:students.length + 1,
        fname:body.fname,
        sname:body.sname,
        email:body.email
    };
    if(!newStudent.fname || !newStudent.sname || !newStudent.email){
       return res.status(400).send({error:"first name, second name and email are requared!!"})
    }
    students.push(newStudent);
    res.send(newStudent);
});

// updating student 

app.put('/api/students/:id',(req,res) =>{
    const id = parseInt(req.params.id);
    const student = students.find(el => el.id === id);
    if(student){
        const updateStudent = req.body;
        students.forEach(student => {
            if(student.id === id){
                student.fname = updateStudent.fname ? updateStudent.fname:student.fname;
                student.sname = updateStudent.sname ? updateStudent.sname:student.sname;
                student.email = updateStudent.email ? updateStudent.email:student.email;
                res.send(student);
            };
        });
    }else{
            res.status(400).send({msg:"bad request"});
        }
});

// deleting data
app.delete('/api/students/:id',(req,res) =>{
    const id = parseInt(req.params.id);
    const student = students.filter(el => el.id !== id);
    if(student){
        res.send(student);
    }else{
        res.status(400).send({msg:"bad request"})
    }
    });


const PORT =process.env.PORT || 5000;
app.listen(PORT,() => console.log(`Server is listening to ${PORT}`));