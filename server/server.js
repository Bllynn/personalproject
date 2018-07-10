const express = require('express');
const app=express();
const massive=require('massive');
require('dotenv').config();
app.use(express.json());
let { 
    SESSION_SECRET,
    SERVER_PORT, 
    REACT_APP_CLIENT_ID, 
    CLIENT_SECRET,
    REACT_APP_DOMAIN,
    CONNECTION_STRING
}=process.env;

// app.use(session({
//     secret:SESSION_SECRET,
//     resave:false,
//     saveUninitialized:false
// }))

massive(CONNECTION_STRING).then(db=>{
    app.set('db',db);
});



const port=process.env.SERVER_PORT || 3001
app.listen(SERVER_PORT,()=>{
    console.log(`Server is listening on port:${SERVER_PORT}`)
});