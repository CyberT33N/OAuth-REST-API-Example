'use strict'


         const log = require('fancy-log'),
   chalkAnimation = require('chalk-animation'),
         gradient = require('gradient-string'),
            chalk = require('chalk'),

controllermongodb = require('../controller/controller-mongodb');






const oauth = {

      addAuthToken: async function(req, res) { return await addAuthToken(req, res); },

      addAccessToken: async function(req, res) { return await addAccessToken(req, res); },

      verifyOAuth: async function(req, res) { return await verifyOAuth(req, res); }

};

module.exports = oauth;



























async function addAuthToken(req, res){
log( 'MAIN - addAuthToken() - SSL: ' + req?.secure + '\nRequest Body: ' + JSON.stringify(req?.body, null, 4) + '\nHeader: ' + JSON.stringify(req?.headers, null, 4)  );


      // Check if POST request contains Client ID & Client Secret
      if( !req?.body?.client_id || !req?.body?.client_secret ){
        const e = 'Your request does not contains Client ID / Client Secret..';
        log(e);
        res.status(400).json( { message: e } );
        return;
      }

      // Check if Client ID & Client Secret can be found in DB
      // Then check if Client ID, Client Secret and Token was already found in DB to avoid duplicated data
      const check = await controllermongodb.verifyClientCredentials(req?.body);
      if( !check || check == 'duplicated' ){
           if( !check ) var e = 'Something went wrong while try to verify your Client ID / Client Secret.. We can not find them in our database.. Maybe you typed them wrong or you didn´t sign-up yet for those credentials..';
           if( check == 'duplicated' ) var e = 'Your Client ID and Client Secret is already active with an Access Token. We cancel the request now..';
           log(e);
           res.status(400).json( { message: e } );
           return;
      }








       // create Auth Token
      const token = new Array(10).fill(null).map(() => Math.floor(Math.random() * 10)).join('');

      // Add the Auth Token, Client ID & Client Secret to DB
      const r = await controllermongodb.addAuthToken(token, req?.body);

      if(!r){
        const e = 'Something went wrong while try to import your Auth Token to the database..';
        log(e);
        res.status(400).json( { message: e } );
        return;
      }

      if ( r == 'duplicated' ) {
         log( 'The current Auth Token was already found in database.. We will try it again..' );
         await addAuthToken(req, res);
         return;
       }


       if( req.secure ) var ssl = 'https://';
       else var ssl = 'http://';

       // Normally this would be a `redirect_uri` parameter, but for this example it is hard coded.
       res.redirect( ssl + req?.headers?.host + `/oauth-callback.html?code=${token}`);


} // async function addAuthToken(){






























  async function addAccessToken(req, res){
  log( 'addAccessToken() - POST REQUEST INCOMING.. Query: ' + JSON.stringify(req?.body, null, 4) );


       const ClientCredentials = await controllermongodb.verifyAuthToken(req?.body?.code);
       if ( ClientCredentials[0] ) {
       log( 'addAccessToken() - ClientCredentials: '  + JSON.stringify(ClientCredentials, null, 4) );


             // clear auth code..
             await controllermongodb.deleteAuthToken(req?.body?.code);

             // Generate a string of 50 random digits
             const token = new Array(50).fill(null).map(() => Math.floor(Math.random() * 10)).join('');

             // Add Access Token to DB
             const r = await controllermongodb.addAccessToken(token, ClientCredentials[0]);

             if( !r ){
                 const e = 'Something went wrong while try to import your Access Token to the database..';
                 log(e);
                 res.status(400).json( { message: e } );
                 return;
             }

             if ( r == 'duplicated' ) {
                  log( 'The current Access Token was already found in database.. We will try it again..' );
                  await addAccessToken(req, res);
                  return;
              }

             // Send Access Token to Client
             res.json({ 'access_token': token, 'expires_in': 60 * 60 * 24 });



       } //  if ( await controllermongodb.verifyAuthToken(token) ) {
       else res.status(400).json( { message: 'Invalid auth token' } );



  } // async function addAccessToken(){
































async function verifyOAuth(req, res){
log( 'verifyOAuth - Body: ' + JSON.stringify(req?.body, null, 4) + '\nHeader: ' + JSON.stringify(req?.headers, null, 4) + '\nQuery: ' + JSON.stringify(req?.query, null, 4) );


log( 'zzz: ' + Object.entries(req?.body).length );
log( 'zzz2: ' + Object.entries(req?.query).length );
      // Check if request contains Client ID & Client Secret
      if(
        Object.entries(req?.body).length > 0 && !req?.body?.client_id ||
        Object.entries(req?.body).length > 0 && !req?.body?.client_secret ||
        Object.entries(req?.query).length > 0 && !req?.query?.client_id ||
        Object.entries(req?.query).length > 0 && !req?.query?.client_secret
      ){

          const e = 'Your request does not contains Client ID & Client Secret..';
          log(e);
          res.status(400).json( { message: e } );
          return;

      }


      // Check if request contains Client ID & Client Secret
      if( !req?.headers?.authorization ){
          const e = 'Your request does not contains Access Token in the Header of the request..';
          log(e);
          res.status(400).json( { message: e } );
          return;
      }


     if( req?.body?.client_id ) var ClientCredentials = req?.body;
     else var ClientCredentials = req?.query;


     if (  !await controllermongodb.verifyAccessToken(req?.headers?.authorization, ClientCredentials)  ) {
       res.status(403).json({ message: 'Unauthorized' });
       return;
     }
     else return req?.headers?.authorization;



} // async function verifyOAuth(){
