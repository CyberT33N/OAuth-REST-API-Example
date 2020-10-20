'use strict'


const oauth = require('../services/oauth');
const endpoints = require('../services/endpoints');

const controller = {

   addAuthToken: async function(req, res) { return await oauth.addAuthToken(req, res); },

   addAccessToken: async function(req, res) { return await oauth.addAccessToken(req, res); },

   verifyOAuth: async function(req, res) { return await oauth.verifyOAuth(req, res); },




   addPizza: async function(req, res) { return await endpoints.addPizza(req, res); },
   deletePizza: async function(req, res) { return await endpoints.deletePizza(req, res); },
   updatePizza: async function(req, res) { return await endpoints.updatePizza(req, res); }


};

module.exports = controller;
