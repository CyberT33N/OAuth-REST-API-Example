'use strict'


const mongodb = require('../services/mongodb');

const controller = {

   verifyClientCredentials: async function(json) { return await mongodb.verifyClientCredentials(json); },

   addAccessToken: async function(token, ClientCredentials) { return await mongodb.addAccessToken(token, ClientCredentials); },
   verifyAccessToken: async function(token, ClientCredentials) { return await mongodb.verifyAccessToken(token, ClientCredentials); },

   addAuthToken: async function(token, ClientCredentials) { return await mongodb.addAuthToken(token, ClientCredentials); },
   deleteAuthToken: async function(token) { return await mongodb.deleteAuthToken(token); },
   verifyAuthToken: async function(token) { return await mongodb.verifyAuthToken(token); },

   importPizza: async function(json) { return await mongodb.importPizza(json); },
   deletePizza: async function(json) { return await mongodb.deletePizza(json); },
   updatePizza: async function(json) { return await mongodb.updatePizza(json); }

};

module.exports = controller;
