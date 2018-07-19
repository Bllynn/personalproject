const express = require('express'),
        app = express(),
        session = require('express-session'),
        axios = require('axios'),
        massive = require('massive'),
        ctrl = require('./controller/controller'),
        authMid= require('./middleware/authMiddleware')

require('dotenv').config();
app.use(express.json());
let {
    SESSION_SECRET,
    SERVER_PORT, 
    REACT_APP_DOMAIN,
    REACT_APP_CLIENT_SECRET,
    REACT_APP_CLIENT_ID,
    CONNECTION_STRING
}=process.env;

app.use(session({
    secret:SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))

massive(CONNECTION_STRING).then(db=>{
    app.set('db',db)
    console.log('DB connected');
});


app.use(authMid.bypassAuthInDevelopment)
///////////////////////////AUTH 0/////////////////////////
app.get('/auth/callback', async (req,res)=>{
  //code from auth0 on req.query.code
  let payload ={
      client_id:REACT_APP_CLIENT_ID,
      client_secret:REACT_APP_CLIENT_SECRET,
      code: req.query.code,
      grant_type:'authorization_code',
      redirect_uri:`http://${req.headers.host}/auth/callback`
  };/////////////////////////PROCESS BELOW THIS////////////////////
  // responseWithToken is taking the data we get back from the axios.post to specific url
  //sending the information located within the payload object ABOVE
  let responseWithToken = await axios.post(`https://${REACT_APP_DOMAIN}/oauth/token`,payload);
  let userData = await axios.get(`https://${REACT_APP_DOMAIN}/userinfo?access_token=${responseWithToken.data.access_token}`)
/////////////////////////////////////JUST ABOVE THIS//////////////////
// userData is waiting for previous code to run, and taking userData that it gets from axios.get...assigning it all to session
  const db = req.app.get('db');
  let {sub,family_name,given_name,picture} = userData.data
  let userExists = await db.find_user([sub]);
      if(userExists[0]){
          req.session.user=userExists[0];
          res.redirect('http://localhost:3000/#/dashboard');
      }else{
          db.create_user([sub,given_name,family_name,picture]).then( createdUser =>{
              req.session.user = createdUser[0]//put something on the req.session.user
              res.redirect('http://localhost:3000/#/dashboard');
          });
          // let createdUser = await db.create_user([sub,name,picture]);
          // req.session.user=createdUser[0];
          // res.redirect('http://localhost:3000/#/');
      }
});
  
app.get('/api/user-data', (req,res)=>{

  if(req.session.user){//if we have a user(we should becuase of lines 47,and 51 above)
      res.status(200).send(req.session.user)
  } else {
      res.status(401).send('Almost...');
  }
});


app.get('/api/logout',(req,res)=>{
  req.session.destroy();
  res.redirect('http://localhost:3000/#/');
})
  
  function checkLoggedIn(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      res.status(403).json({ message: 'Please log in to schedule an appointment' });
    }
  }
  
  app.get('/api/secure-data', checkLoggedIn, (req, res) => {
    res.json({ someSecureData: 123 });
  });
  
///////////////////////////AUTH 0/////////////////////////
//////////////////MY CODE////////////////////////////////


// app.get('/api/users',ctrl.getAllUsers)

app.get('/api/appointment/',ctrl.getAllAptByUser)

app.put('/api/appointment/:id',ctrl.editApt)

app.delete('/api/appointment/:id',ctrl.deleteApt)

app.post('/api/appointment', ctrl.createAppointment)

const port=process.env.SERVER_PORT || 3001
app.listen(SERVER_PORT,()=>{
    console.log(`Server is listening on port:${port}`)
});