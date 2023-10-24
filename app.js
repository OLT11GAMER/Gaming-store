let express = require('express')
let app = express();
let bodyParser = require('body-parser')
let mysql = require('mysql2')
app.use('/static', express.static('static'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
let database = require('./database')
database.sync()
let bcrypt = require('bcrypt')
let modeli = require('./userModel')
app.get('/', (req, res) => {
    res.render("regjistrohu.ejs");
})
app.post(
    '/regjistroUser', (req, res) => {
        if(reg.body.password == reg.body.confirmPw){
            // insertoi te dhenat ne databaze
            let passwordiEnkriptuar = bcrypt.hashSync(req.body.password, 6)
            console.log(`passworDI JUAJ : ${passwordiEnkriptuar} ..... ESHTE ENKRIPTUAR`)
            modeli.build({
                username: req.body.username,
                password: passwordiEnkriptuar 
            }).save().then(
                ()=>{res.send('te dhenat u insertuan')})
                .catch((err)=>{res.send(err)})
            // res.send("passwordaat jane okej");
        } else {
            res.send("passwordat jane gabim");
        }
    }
)
app.listen(8081);