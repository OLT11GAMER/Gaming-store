let express = require('express');
let app = express();
let mysql = require('mysql2');

const bodyParser = require('body-parser');

// Parse form data
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/static', express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
let database = require('./database');
database.sync();
let modeli = require('./userModel');
let bcrypt = require('bcrypt');

app.get('/register', (req, res) => {
    res.render("register.ejs");
})
app.post(
    '/register', (req, res) => {
        if(req.body.password == req.body.confirmPassword){
            // insertoi te dhenat ne databaze
            let passwordiEnkriptuar = bcrypt.hashSync(req.body.password, 6)
            console.log(`passworDI JUAJ : ${passwordiEnkriptuar} ..... ESHTE ENKRIPTUAR`)
            modeli.build({
                username: req.body.username,
                email: req.body.email,
                password: passwordiEnkriptuar 
            }).save().then(
                ()=>{res.send('te dhenat u insertuan')})
                .catch((err)=>{res.send(err)})
                .then(res.render("index"))
            // res.send("passwordaat jane okej");
        } else {
            res.send("passwordat jane gabim");
        }
    }
)

// Create a simple route for the login page
app.get('/login', (req, res) => {
  res.render('login');
});
// Handle the login form submission
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Check the username and password (you can implement your authentication logic here)

  if (username === 'yourusername' && password === 'yourpassword') {
    // Successful login, you can redirect to another page or perform further actions
    res.send('Login successful');
  } else {
    res.send('Login failed');
  }
});

app.listen(8081);