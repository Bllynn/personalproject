const express = require('express'),
        app = express(),
        session = require('express-session'),
        axios = require('axios'),
        massive = require('massive'),
        ctrl = require('./controller/controller')
require('dotenv').config();
app.use(express.json());
let {
    SESSION_SECRET,
    SERVER_PORT, 
    REACT_APP_DOMAIN,
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


// app.use(authMid.bypassAuthInDevelopment)
///////////////////////////AUTH 0/////////////////////////
app.get('/auth/callback', (req, res) => {
  
  
  
    // STEP 1.)
    //Make an object called payload with the code recieved from the clientside, client_id, client_secret, grant_type, redirect_uri 
    //hint: code is recieved from client side as a query
    let {//destructureing these items off of our .env file
      REACT_APP_AUTH0_CLIENT_ID,
      REACT_APP_AUTH0_CLIENT_SECRET
    } = process.env;
    let payload ={
      
      client_id:REACT_APP_AUTH0_CLIENT_ID,
      client_secret:REACT_APP_AUTH0_CLIENT_SECRET,
      code: req.query.code,
      grant_type: 'authorization_code',
      redirect_uri:`http://${req.headers.host}/auth/callback`
      
    };
    
    
    //STEP 2.)
    // WRITE a FUNCTION that RETURNS an axios POST with the payload as the body
    function tradeCodeForAccessToken(){
      
      //code here..
      return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload)
    }
    
    //STEP 3.)
    // WRITE a FUNCTION that accepts the access token as a parameter and RETURNS an axios GET to auth0 that passes the access token as a query
    function tradeAccessTokenForUserInfo(response){
      
      //code here ..
      let token = response.data.access_token; 
      return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo/?access_token=${token}`)
    }
    
    
    //STEP 4.)
    
    // WRITE a FUNCTION that accepts the userInfo as a parameter and RETURNS a block of code.
    // Your code should set session, check your database to see if user exists and return thier info or if they dont exist, insert them into the database
    function storeUserInfoInDataBase(response){
      
      //code here...
      req.session.user= response.data;
      res.redirect('http://localhost:3000/#/');
      
    }
     
    //Final Code, Uncomment after completeing steps 1-4 above
    
    tradeCodeForAccessToken()
    .then(accessToken => tradeAccessTokenForUserInfo(accessToken))
    .then(userInfo => storeUserInfoInDataBase(userInfo));
    
    
  });
  
  app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.send();
  });
  
  app.get('/api/user-data', (req, res) => {
    res.json({ user: req.session.user });
  });
  
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
app.get('/api/users',ctrl.getAllUsers)
app.get('/api/appointment/:id',ctrl.getAllAptByUser)

app.delete('/api/appointment/:id',ctrl.deleteApt)






const port=process.env.SERVER_PORT || 3001
app.listen(SERVER_PORT,()=>{
    console.log(`Server is listening on port:${port}`)
});