'use strict'



/*
███████████████████████████████████████████████████████████████████████████████
██******************** PRESENTED BY t33n Software ***************************██
██                                                                           ██
██                  ████████╗██████╗ ██████╗ ███╗   ██╗                      ██
██                  ╚══██╔══╝╚════██╗╚════██╗████╗  ██║                      ██
██                     ██║    █████╔╝ █████╔╝██╔██╗ ██║                      ██
██                     ██║    ╚═══██╗ ╚═══██╗██║╚██╗██║                      ██
██                     ██║   ██████╔╝██████╔╝██║ ╚████║                      ██
██                     ╚═╝   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝                      ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████████████████████
.__                              __           .__               .__
|__| _____ ______   ____________/  |_  ______ |  |  __ __  ____ |__| ____   ______
|  |/     \\____ \ /  _ \_  __ \   __\ \____ \|  | |  |  \/ ___\|  |/    \ /  ___/
|  |  Y Y  \  |_> >  <_> )  | \/|  |   |  |_> >  |_|  |  / /_/  >  |   |  \\___ \
|__|__|_|  /   __/ \____/|__|   |__|   |   __/|____/____/\___  /|__|___|  /____  >
         \/|__|                        |__|             /_____/         \/     \/
*/

    const express = require('express'),
              app = express(),

       bodyParser = require('body-parser'),

             csrf = require('csurf'),
     cookieParser = require('cookie-parser'),
   csrfProtection = csrf({ cookie: true }),
        parseForm = bodyParser.urlencoded({ extended: false }),


           router = express.Router(),
             port = process.env.PORT || 1337,
        rateLimit = require('express-rate-limit'),
          timeout = require('connect-timeout'),


             cors = require('cors'),
           helmet = require('helmet'),
           morgan = require('morgan'),




       controller = require('./controller/controller'),

             path = require("path"),
               os = require('os'),
           osHOME = os.homedir(),
       osPLATFORM = os.platform(),

   chalkAnimation = require('chalk-animation'),
         gradient = require('gradient-string'),
            chalk = require('chalk'),

               fs = require('fs'),
              log = require('fancy-log'),
           {exec} = require('child_process'),



      json_config = JSON.parse(  fs.readFileSync('./admin/config.json', 'utf8')  ),

            limit = json_config.request_limit;















/*
 ████████████████████████████████████████████████████████████████████████████████
 */


 // ADVERTISE
 var ads = gradient('red', 'white').multiline([
        '',
        'Presented by',
        '████████╗██████╗ ██████╗ ███╗   ██╗',
        '╚══██╔══╝╚════██╗╚════██╗████╗  ██║',
        '   ██║    █████╔╝ █████╔╝██╔██╗ ██║',
        '   ██║    ╚═══██╗ ╚═══██╗██║╚██╗██║',
        '   ██║   ██████╔╝██████╔╝██║ ╚████║',
        '   ╚═╝   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝ Software'
 ].join('\n'));
 console.log(ads);
 console.log( '\nCheck my Github Profile: ' + chalk.white.bgGreen.bold(' github.com/CyberT33N ')  + '\n\n');
 console.log( gradient('white', 'black')('\n\n=======================================\n\n') );




     /*
     -----------------------------------------------------------------------------

     ███████╗████████╗ █████╗ ██████╗ ████████╗    ███████╗ ██████╗██████╗ ██╗██████╗ ████████╗
     ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝    ██╔════╝██╔════╝██╔══██╗██║██╔══██╗╚══██╔══╝
     ███████╗   ██║   ███████║██████╔╝   ██║       ███████╗██║     ██████╔╝██║██████╔╝   ██║
     ╚════██║   ██║   ██╔══██║██╔══██╗   ██║       ╚════██║██║     ██╔══██╗██║██╔═══╝    ██║
     ███████║   ██║   ██║  ██║██║  ██║   ██║       ███████║╚██████╗██║  ██║██║██║        ██║
     ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝       ╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═╝        ╚═╝
     */

     log( 'Current working directory: ' + __dirname );



// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);
log( 'rate limit value: ' + limit );
const apiLimiter = rateLimit({
  windowMs: limit,
  message: "Too many POST requests created from this IP, please try again in " + limit + "ms",
  max: 1 //<-- max limit
});




// parse application/json
app.use( bodyParser.json() );

// adding Helmet to enhance your API's security
app.use( helmet() );

// enabling CORS for all requests
//app.use( cors() );

// adding morgan to log HTTP requests
app.use( morgan('combined') );

// parse cookies
// we need this because "cookie" is true in csrfProtection
app.use(cookieParser());


// This must be done to send the csrf token..
app.set('view engine', 'ejs');


// set website..
app.use(express.static(__dirname + '/website'));










// log all requests..
app.use(function (req, res, next) {

    if( path.extname(path.basename(req.url)) ) log("The file " + path.basename(req?.url) + " was requested.");
    else log("The endpoint " + path.basename(req?.url) + " was requested.");

    next();

});

























/*
██████╗  █████╗ ██╗   ██╗████████╗██╗  ██╗
██╔═══██╗██╔══██╗██║   ██║╚══██╔══╝██║  ██║
██║   ██║███████║██║   ██║   ██║   ███████║
██║   ██║██╔══██║██║   ██║   ██║   ██╔══██║
╚██████╔╝██║  ██║╚██████╔╝   ██║   ██║  ██║
╚═════╝ ╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝
*/

// render OAuth Window and include csrf Token
app.get('/dialog', csrfProtection, (req, res) => {(async () => {  res.render(__dirname + '/website/dialog/index', { csrfToken: req.csrfToken() });  })().catch((e) => {  log('ASYNC - GET - Error at dialog Route.. Error: ' + e)  })});



// Generate an auth code and redirect to your app client's
// domain with the auth code
app.post('/code', parseForm, csrfProtection, function(req, res){(async () => {  await controller.addAuthToken(req, res);  })().catch((e) => {  log('ASYNC - POST - Error at code Route.. Error: ' + e)  })});





app.options('/token', cors(), (req, res) => res.end());

// Verify an auth code and exchange it for an access token
app.post('/token', cors(), (req, res) => {(async () => {  await controller.addAccessToken(req, res);  })().catch((e) => {  log('ASYNC - POST - Error at token Route.. Error: ' + e)  })});







app.options('/secure', cors(), (req, res) => res.end());

// Endpoint secured by auth token -- This is just a sample endpoint for testing if the OAuth process was done successfully
app.post('/secure', cors(), (req, res) => {(async () => {

   const accessToken = await controller.verifyOAuth(req, res);
   log( 'accessToken: ' + accessToken );
   if( accessToken ) res.status(200).json({ accessToken: accessToken });

})().catch((e) => {  log('ASYNC - POST - Error at secure Route.. Error: ' + e)  })});





















/*
███████╗███╗   ██╗██████╗ ██████╗  ██████╗ ██╗███╗   ██╗████████╗███████╗
██╔════╝████╗  ██║██╔══██╗██╔══██╗██╔═══██╗██║████╗  ██║╚══██╔══╝██╔════╝
█████╗  ██╔██╗ ██║██║  ██║██████╔╝██║   ██║██║██╔██╗ ██║   ██║   ███████╗
██╔══╝  ██║╚██╗██║██║  ██║██╔═══╝ ██║   ██║██║██║╚██╗██║   ██║   ╚════██║
███████╗██║ ╚████║██████╔╝██║     ╚██████╔╝██║██║ ╚████║   ██║   ███████║
╚══════╝╚═╝  ╚═══╝╚═════╝ ╚═╝      ╚═════╝ ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝
*/



// add pizza title and id to db
app.post('/pizza', apiLimiter, function(req, res){(async () => {  if( await controller.verifyOAuth(req, res) ) await controller.addPizza(req, res);  })().catch((e) => {  log('ASYNC - POST - Error at pizza Route.. Error: ' + e)  })});

// delete pizza from db
app.delete('/pizza', apiLimiter, function(req, res){(async () => {  if( await controller.verifyOAuth(req, res) ) await controller.deletePizza(req, res);  })().catch((e) => {  log('ASYNC - DELETE - Error at pizza Route.. Error: ' + e)  })});

// update pizza title
app.put('/pizza', apiLimiter, function(req, res){(async () => {  if( await controller.verifyOAuth(req, res) ) await controller.updatePizza(req, res);  })().catch((e) => {  log('ASYNC - PUT - Error at pizza Route.. Error: ' + e)  })});















app.listen(port, () => {
  log('Server was started.. Listening on port: ' + port);
});
