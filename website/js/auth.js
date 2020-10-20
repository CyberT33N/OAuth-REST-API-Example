(async () => {


     // Step 1: open an OAuth dialog
     oauthOpen( window.location.origin + '/dialog', async (e, code) => {
     console.log( 'code: ' + JSON.stringify(code, null, 4) );

     if( e ){
       console.log( 'oauthOpen() - error: ' + e );
       return;
     }

          // Step 2: exchange the code for an access token
          const accessToken = await axios.post(  window.location.origin + '/token', { code: code.code });
          console.log( 'accessToken: ' + JSON.stringify(accessToken, null, 4) );


          // Step 3 (Sample Request): use the access token to make a request to a secure endpoint and display some data
          const res = await axios.post(  window.location.origin + '/secure', { client_id: 'a', client_secret: 'b'  }, {
            headers: { authorization: accessToken.data['access_token'] }
          });
          console.log( 'res: ' + JSON.stringify(res, null, 4) );



          document.querySelector('#content').innerHTML = `Auth result: ${res.data.answer}`;


      }); // oauthOpen( window.location.origin + '/oauth-dialog.html', async (err, code) => {


})().catch((e) => {
     console.log('Error:' +  e )
});
