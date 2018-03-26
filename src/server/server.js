require('dotenv').config();
const express=require('express'),
      session=require('express-session'),
      passport=require('passport'),
      Auth0Strategy=require('passport-auth0'),
      massive=require('massive');
      bodyParser=require('body-parser');
      // cors=require('cors');

const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING,
    REACT_APP_PRIVATE,
    REACT_APP_FAILURE
}=process.env;

const app=express();
app.use(bodyParser.json());
const display_ctr = require('./controller/display_controller');



massive(CONNECTION_STRING).then(db=>{
    app.set('db',db);
});

app.use(express.static(`${__dirname}/../build`))

app.use((req, res, next) => {
    res.set({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': REACT_APP_FAILURE,
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Credentials': true,
      'X-XSS-Protection': '1; mode=block',
      'X-Frame-Options': 'SAMEORIGIN',
      'Content-Security-Policy': "default-src 'self' unsafe-inline devmountain.github.io"
    })
    next();
  });

app.use(session({
    secret:SESSION_SECRET,
    resave:false,
    saveUninitialized:true
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
    domain:DOMAIN,
    clientID:CLIENT_ID,
    clientSecret:CLIENT_SECRET,
    callbackURL:CALLBACK_URL,
    scope:'openid profile'
},function(accessToken,refreshToken,extraParams,profile,done){
    const db=app.get('db')
    db.find_user([profile.id]).then(users=>{ //massive convention is to pass info in as array
        if (!users[0]){
            db.create_user([profile.displayName,profile.picture,profile.id]) //massive convention is to pass info in as array
            .then(userCreated=>{
                done(null,userCreated[0].id)
            })
        } else{
            done(null,users[0].id)
        }
    })
}))

passport.serializeUser((id,done)=>{
    done(null,id)
})
passport.deserializeUser((id,done)=>{                       // takes sid, gets uid, queries db, returns current user, 
    app.get('db').find_session_user([id]).then(user=>{      // appends to req obj as req.user (represents current user) <- REMEMBER!
        done(null,user[0]);
    })                                                     
                         
})

app.get('/auth',passport.authenticate('auth0'));
app.get('/auth/callback',passport.authenticate('auth0',{
    successRedirect:REACT_APP_PRIVATE,
    failureRedirect:REACT_APP_FAILURE
}))
app.get('/auth/me',(req,res)=>{
    if(!req.user){
        res.status(403).send('sup')
    }else{
        res.status(200).send(req.user);
    }
})
app.get('/testing',(req,res)=>{
    res.status(200).send('testing');
})
app.get('/auth/logout',(req,res)=>{
    req.logOut()
    res.redirect(REACT_APP_FAILURE)
})

app.listen(SERVER_PORT,()=>console.log(`ITS OVER ${SERVER_PORT}`));



app.get('/api/reviews', display_ctr.read);
app.get('/api/review/:reviewsid', display_ctr.getOne);
app.post('/api/review', display_ctr.addReview);
app.delete('/api/review/:reviewsid', display_ctr.deleteReview);
app.put('/api/review/:reviewsid', display_ctr.editReview);



