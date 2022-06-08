var express = require('express');
const app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended : true 
}));

app.get('/',function(req,res){
    res.render('Home')
});


    
    // var name = req.body.f_name;

    // console.log(name);

var con = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'students_registration'
});

con.connect();
    
    console.log('Database is connected');

    app.post('/getdata',function (req, res){
        console.log(req.body);
    

    var firstname = req.body.f_name;
    var middlename = req.body.m_name;
    var lastname = req.body.l_name;
    var course = req.body.course;
    var gender = req.body.gender;
    var phone = req.body.phone;
    var address = req.body.address;
    var email = req.body.email;
    var password = req.body.pass;
    var retype_password = req.body.repass;
       
    var sql = "INSERT INTO registration (firstname,middlename,lastname,course,gender,phone,address,email,password,retype_password)values('"+firstname+"','"+middlename+"','"+lastname+"','"+course+"','"+gender+"','"+phone+"','"+address+"','"+email+"','"+password+"','"+retype_password+"')";
    con.query(sql,function(err,result){
        if(err)throw err;
        console.log('record inserted');
    })
    res.redirect('/');
    //res.send('next page);

})
 app.get('/selectdata', function(req, res)
 {
     var selectdata = "select * from registration";
     con.query(selectdata,function(error,results,fields){
         if(error) throw error;
         res.json({
             data:results
         })
         
         
     });
 })

 app.get('/updatedata',function (req,res) {

    var updatedata = "UPDATE registration SET firstname = 'Arpitkumar' where id='1'";

    con.query(updatedata,function (error,results,field) {
        if (error) throw error;
        res.json({
            data : results
        })
    })
 })

app.listen(2222);

