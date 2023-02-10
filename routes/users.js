var express = require('express');
var router = express.Router();
const path = require('path')
const {sendMagicLink,verifyMagicLink} = require('email-only-auth');


//  sample constant values----------EMAIL-ONLY-AUTH---------------

const JWTSecret = 'secretforemailonlyauth'; // JWT secret
const url = 'http://localhost:3000/users/verify'; // url to send magic link
  const tokenExpiration = '1h'; // token expiration time in hours

//  user information that we need to create the token using JWT, 
//  and email information that we need to send the token
const data = {
    userInfo :{
        id:1,
        username:"sidhik"
    },
    // email information that we need to send to the user
    emailInfo:{
        from:"sidhh1994@gmail.com",
        to:"***********@gmail.com",
        subject:"Hello world",
        text:"This is for sample text",
        html:"<a href='http://localhost:3000'>Link</a>", // add either html content or create template and send the path.
        templatePath: path.join(__dirname,'../template/authTemplate/template.html'), //path of the html template.
        templateContext: {              //  values that added to the template dynamically eg: <h1>{{title}}<h1/> => <h1>Email validation<h1/>
            title:"Email validation",
        }
    }
}
// sample constant values----------EMAIL-ONLY-AUTH---------------


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', async function(req, res, next) {
  const {email} = req.body;
  if (email) {
    data.emailInfo.to = email;
    let result = await sendMagicLink(url,data,tokenExpiration,JWTSecret);
    res.send(result); 
  }
});

router.get('/verify', function(req, res, next) {
  const token = req.query.token
  const isValid = verifyMagicLink(token,JWTSecret);
  res.send(isValid);
});

module.exports = router;
