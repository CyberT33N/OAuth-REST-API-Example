'use strict'


         const fs = require('fs'),
      json_config = JSON.parse(  fs.readFileSync('./admin/config.json', 'utf8')  ),
              log = require('fancy-log'),
   chalkAnimation = require('chalk-animation'),
         gradient = require('gradient-string'),
            chalk = require('chalk'),
      MongoClient = require('mongodb').MongoClient,
           assert = require('assert'),
         ObjectId = require('mongodb').ObjectId,
   MongoDB_DB_URL = json_config.MongoDB_DB_URL,
  MongoDB_DB_NAME = json_config.MongoDB_DB_NAME;
  var MongoDB, client;










log( 'MongoDB_DB_URL: ' + MongoDB_DB_URL );
MongoClient.connect(MongoDB_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, function(e, client) {
console.log( gradient('white', 'black')('\n\n=======================================\n\n') );

   if(e){
     log( chalk.red.bold('❌ ERROR') + ' Error while try to connect to MongoDB Database - ' + chalk.white.bold('error:\n') + e );
     //assert.equal(null, e);
     return;
   } //   if(e){

     log( 'MongoDB - Connected successfully to server..' );
     MongoDB = client.db( MongoDB_DB_NAME );

});





















const mongodb = {

      verifyClientCredentials: async function(json) { return await verifyClientCredentials(json); },

      addAccessToken: async function(token, ClientCredentials) { return await addAccessToken(token, ClientCredentials); },
      verifyAccessToken: async function(token, ClientCredentials) { return await verifyAccessToken(token, ClientCredentials); },

      addAuthToken: async function(token, ClientCredentials) { return await addAuthToken(token, ClientCredentials); },
      verifyAuthToken: async function(token) { return await verifyAuthToken(token); },
      deleteAuthToken: async function(token) { return await deleteAuthToken(token); },

      importPizza: async function(json) { return await importPizza(json); },
      deletePizza: async function(json) { return await deletePizza(json); },
      updatePizza: async function(json) { return await updatePizza(json); }

};

module.exports = mongodb;






































async function verifyClientCredentials(json){
log( 'verifyClientCredentials() - json: ' + JSON.stringify(json, null, 4) );

      const collection = MongoDB.collection('access');

      const r = await collection.find({  $and: [{"client_id": json?.client_id},{"client_secret": json?.client_secret}]  }).toArray({});
      log( 'verifyClientCredentials() - result:' + JSON.stringify(r, null, 4) );

      const tokenExist = await collection.find({   $and: [{"client_id": json?.client_id}, {"client_secret": json?.client_secret}, {"token": {"$exists":true}}]   }).toArray({});
      log( 'verifyClientCredentials() - tokenExist:' + JSON.stringify(tokenExist, null, 4) );

      if( tokenExist[0] ){ return 'duplicated'; }
      if( r[0] ){ return r; }

}; // async function verifyClientCredentials(json){
































async function addAccessToken(token, ClientCredentials){
log( 'addAccessToken() - token: ' + token + '\nClientCredentials: ' + JSON.stringify(ClientCredentials, null, 4) );

      const collection = MongoDB.collection('access');

      const duplicated = await collection.find( {"token": token} ).toArray({});
      log( 'addAccessToken() - duplicated:' + JSON.stringify(duplicated, null, 4) );
      if( duplicated[0] ){ return 'duplicated'; }


      //const query = { "client_id": ClientCredentials.client_id, "client_secret": ClientCredentials.client_secret };
      const query = { $and: [{"client_id": ClientCredentials?.client_id}, {"client_secret": ClientCredentials?.client_secret}] };
      const newValue = { $set: { "token": token } };

      const r = await collection.updateOne(query, newValue);
      log( 'addAccessToken() - result:' + JSON.stringify(r, null, 4) );
      if( r.result.n == 1 ) return r;


}; // async function addAccessToken(token, ClientCredentials){






async function verifyAccessToken(token, ClientCredentials){
log( 'verifyAccessToken() - token: ' + token + '\nClientCredentials: ' + JSON.stringify(ClientCredentials, null, 4) );

      const collection = MongoDB.collection('access');

      const r = await collection.find( { $and: [{"client_id": ClientCredentials?.client_id}, {"client_secret": ClientCredentials?.client_secret}, {"token": token}] } ).toArray({});
      log( 'verifyAccessToken() - result:' + JSON.stringify(r, null, 4) );
      if( r[0] ){ return true; }

}; // async function verifyAccessToken(token, ClientCredentials){





















async function addAuthToken(token, ClientCredentials){
log( 'addAuthToken() - token: ' + token + '\nClientCredentials: ' + JSON.stringify(ClientCredentials, null, 4) );

      const collection = MongoDB.collection('auth');

      const duplicated = await collection.find( {"token": token} ).toArray({});
      log( 'addAuthToken() - duplicated:' + JSON.stringify(duplicated, null, 4) );
      if( duplicated[0] ){ return 'duplicated'; }

      const r = await collection.insertOne( {"token": token, "client_id": ClientCredentials.client_id, "client_secret": ClientCredentials.client_secret} );
      log( 'addAuthToken() - result:' + JSON.stringify(r, null, 4) );
      if( r.result.n == 1 ) return r;

};








async function verifyAuthToken(token){
log( 'verifyAuthToken() - token: ' + token );

      const collection = MongoDB.collection('auth');
      const r = await collection.find( {"token": token} ).toArray({});
      if( r[0] ){ return r; }

}; // async function verifyAuthToken(token){







async function deleteAuthToken(token){
log( 'deleteAuthToken() - token: ' + token );

      const collection = MongoDB.collection('auth');

      const r = await collection.deleteOne( {"token": token} );
      log( 'deleteAuthToken() - result:' + JSON.stringify(r, null, 4) );
      if( r.result.n == 1 ) return r;

};
































async function importPizza(json){
log('importPizza() - json: ' + JSON.stringify(json, null, 4));

      const collection = MongoDB.collection('pizza');

      const duplicated = await collection.find( {"id": json.id} ).toArray({});
      log( 'importPizza() - duplicated:' + JSON.stringify(duplicated, null, 4) );
      if( duplicated[0] ){ return 'duplicated'; }

      const r = await collection.insertOne( {"id": json.id, "title": json.title} );
      log( 'importPizza() - result:' + JSON.stringify(r, null, 4) );
      if( r.result.n == 1 ) return r;

}; // async function importPizza(json){











async function deletePizza(json){
log('deletePizza() - json: ' + JSON.stringify(json, null, 4));

      const collection = MongoDB.collection('pizza');

      const match = await collection.find( {"id": json.id} ).toArray({});
      log( 'deletePizza() - match:' + JSON.stringify(match, null, 4) );
      if( !match[0] ){ return 'NOT FOUND'; }

      const r = await collection.deleteOne( {"id": json.id} );
      log( 'deletePizza() - result:' + JSON.stringify(r, null, 4) );
      if( r.result.n == 1 ) return r;

};












async function updatePizza(json){
log('updatePizza() - json: ' + JSON.stringify(json, null, 4));

      const collection = MongoDB.collection('pizza');

      const match = await collection.find( {"id": json.id} ).toArray({});
      log( 'updatePizza() - match:' + JSON.stringify(match, null, 4) );
      if( !match[0] ){ return 'NOT FOUND'; }


      const query = { id: json.id };
      const newValue = { $set: { title: json.title } };

      const r = await collection.updateOne(query, newValue);
      log( 'updatePizza() - result:' + JSON.stringify(r, null, 4) );
      if( r.result.n == 1 ) return r;

};
