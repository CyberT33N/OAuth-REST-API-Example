'use strict'


         const log = require('fancy-log'),
   chalkAnimation = require('chalk-animation'),
         gradient = require('gradient-string'),
            chalk = require('chalk'),

controllermongodb = require('../controller/controller-mongodb');






const endpoints = {

      addPizza: async function(req, res) { return await addPizza(req, res); },
      deletePizza: async function(req, res) { return await deletePizza(req, res); },
      updatePizza: async function(req, res) { return await updatePizza(req, res); }

};

module.exports = endpoints;



















async function addPizza(req, res){
log( 'addPizza() - POST REQUEST INCOMING.. Query: ' + JSON.stringify(req?.query, null, 4) );


      if ( !req?.query?.id || !req?.query?.title ) {
          const e = 'As it seems the POST request doesnt contain a valid ID & Title.. We cancel the request now..';
          log(e);
          res.send(e);
          return;
       }



       const r = await controllermongodb.importPizza(req?.query);
       if ( r == 'duplicated' || !r ) {

           if( !r ) var e = 'Something went wrong while try to import your item to the database..';
           if( r == 'duplicated' ) var e = 'The current item was already found in database.. Please choose a different item..';
           log(e);
           res.send(e);
           return;

        }




         const l = 'Successfully imported your item to the database.. Pizza ID: ' + req?.query?.id + '\nPizza Title: ' + req?.query?.title;
         log(l);
         res.send(l);


} // async function addPizza(){















async function deletePizza(req, res){
log( 'PIZZA - DELETE REQUEST INCOMING.. Query: ' + JSON.stringify(req?.query, null, 4) );


        if ( !req?.query?.id ) {
              const e = 'As it seems the DELETE request doesnt contain a valid ID in the url.. We cancel the request now..';
              log(e);
              res.send(e);
              return;
         }


         const r = await controllermongodb.deletePizza(req?.query);
         if ( !r || r == 'NOT FOUND' ) {
             if( !r ) var e = 'Something went wrong while try to delete your item..';
             if( r == 'NOT FOUND' ) var e = 'We cant find your item in the database so we cant delete it.. current item: ' + req?.query?.id;
             log(e);
             res.send(e);
             return;
          }

           const l = 'Successfully deleted your item from the database.. Your item was: ' + req?.query?.id;
           log(l);
           res.send(l);


} // async function deletePizza(){

















async function updatePizza(req, res){
log( 'PIZZA - PUT REQUEST INCOMING.. Query: ' + JSON.stringify(req?.query, null, 4) );


        if ( !req?.query?.id || !req?.query?.title ) {
              const e = 'As it seems the PUT request doesnt contain a valid ID & Title in the url.. We cancel the request now..';
              log(e);
              res.send(e);
              return;
         }


         const r = await controllermongodb.updatePizza(req?.query);
         if ( !r || r == 'NOT FOUND' ) {
             if( !r ) var e = 'Something went wrong while try to update your item..';
             if( r == 'NOT FOUND' ) var e = 'We cant find your item in the database so we cant update it.. current item: ' + req?.query?.id;
             log(e);
             res.send(e);
             return;
          }

           const l = 'Successfully updated your item from the database.. Your item was: ' + req?.query?.id;
           log(l);
           res.send(l);

} // async function updatePizza(){
