const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');



const app = express();
const port = 3000;


//create connection to database
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Vira@95714',
    database:'school'
});

connection.connect()


//parse application
app.use(bodyParser.urlencoded({extended:false}))

//parse application/json
app.use(bodyParser.json())

//HTTP Methods 
//GET , POST, DELETE, PUT(update)

app.post('/save',(req, res)=>{
    connection.query('insert into student(sid, name, age, marks) values (?,?,?,?);',[req.body.sid, req.body.name, req.body.age, req.body.marks],(err, result)=>{
        if(err) throw err

        res.json(result);
        console.log(result);
    })
})

app.get('/get', (req, res)=>{
    connection.query('select * from student',(err, result)=>{
        if(err) throw err

        res.json(result)
    })
})

app.delete('/delete/:sid',(req, res)=>{
    connection.query('delete from student where sid=?;', [req.params.sid], (err, result)=>{
        if(err) throw err

        res.json(result)
    })
})

app.put('/update/:sid', (req, res)=>{
    connection.query('update student set name=? where sid=?;', [req.body.name, req.params.sid], (err, result)=>{
        if(err) throw err


        res.json(result)
    })
})


app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})