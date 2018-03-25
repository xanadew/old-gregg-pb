require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
const session = require('express-session');
const axios = require ('axios')
const path = require('path')


const display_ctr = require('./controllers/display_controller');



const app = express();

app.use( express.static( `${__dirname}/../build` ) );


app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }));


massive(process.env.CONNECTION_STRING)
.then( db => {
    app.set('db', db)
}).catch(error => {
    console.log('error', error);
  });

  app.post('/login', (req, res) => {
    const { userId } = req.body;
    const auth0Url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${userId}`;
    axios.get(auth0Url, {
      headers: {
        Authorization: 'Bearer ' + process.env.AUTH0_MANAGEMENT_ACCESS_TOKEN
      }
    }).then(response => {
      const userData = response.data;
      app.get('db').find_user(userData.user_id).then(users => {
        if (users.length) {
          req.session.user = users[0]
          res.json({ user: req.session.user });
        } else {
          app.get('db').create_user([userData.user_id, userData.email, userData.picture, userData.name]).then( user => {
            req.session.user = user[0];
            res.json({ user: req.session.user });
          }).catch(error => {
            console.log('error', error);
          });
        }
      })
    }).catch(error => {
      console.log('error', error);
      res.status(500).json({ message: 'Oh noes!' });
    });
  });
  
  app.get('/user-data', (req, res) => {
    if(req.session.user){
      res.status(200).send(req.session.user);
  } else {
      res.status(403);
  }
  });

app.get('/api/reviews', display_ctr.read);
app.get('/api/review/:reviewsid', display_ctr.getOne);
app.post('/api/review', display_ctr.addReview);
app.delete('/api/review/:reviewsid', display_ctr.deleteReview);
app.put('/api/review/:reviewsid', display_ctr.editReview);


const db = app.get('db');


app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})


const port = 80;

app.listen(port, () => console.log(`I'm listening... on port: ${port}`));