let express = require('express');
let app = express();
let mysql = require('mysql2');
const bcrypt = require('bcrypt');

app.use(express.urlencoded({ extended: true }));
app.use('/views', express.static('views'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');



let database = require('./database');
database.sync();


let modeli = require('./userModel');

app.get('/', (req, res) => {  
    res.render('index.ejs');
})

app.get('/register', (req, res) => {
  res.render('register.ejs');
})

app.post('/register', async (req, res) => {

  try {
    if (req.body.password === req.body.confirmPassword) {

      let passwordiEnkriptuar = await bcrypt.hash(req.body.password, 6);

      console.log(`Password Hash: ${passwordiEnkriptuar}`);




      await modeli.create({
        username: req.body.username,
        email: req.body.email,
        password: passwordiEnkriptuar,
      });
      res.render('index.ejs');
    } else {

      res.send('passwords do not match');

    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
})
app.get('/login', (req, res) => {
  res.render('login.ejs');
})

app.post('/login', async (req, res) => {
  try {
    const user = await modeli.findOne({ where: { username: req.body.username } });
    if (!user) {
      return res.status(404).send('User not found');
    } else {
      bcrypt.compare(req.body.password, user.password, (err, resu) => {
        if (err) {
          console.log(err);
        }
        else {
          console.log(resu);

          if (resu) {
            res.render('index.ejs')


          } else {
            res.render('/login.ejs')
          }
        }

      })
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
})
app.listen(8081, () => {
  console.log('Server is running on port 8081');
});