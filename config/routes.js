/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'index'
  },

  'GET /connect' : { action : 'api/connect' },

  'POST /manuel/livraison' : { action : 'api/manuelLivraison' },
  'POST /manuel/reception' : { action : 'api/manuelReception' },
  'POST /bars/livraison' : { action : 'api/barsLivraison' },
  'POST /bars/reception' : { action : 'api/barslReception' },

  '/inventaire' : { action : 'product/inventaire'},

  'GET /livraison/new' : { action : 'livraison/new'},
  'GET /livraison' : { action : 'livraison/find'},
  'POST /livraison' : { action : 'livraison/save'},
  'POST /livraison/delete' : { action : 'livraison/delete'},

  'GET /reception/new' : { action : 'reception/new'},
  'GET /reception' : { action : 'reception/find'},
  'POST /reception' : { action : 'reception/save'},
  'POST /reception/delete' : { action : 'reception/delete'},

  'GET /client/new' : { view : 'client/create'},
  'GET /client/{id}' : { view : 'client/findOne'},
  'POST /client' : { action : 'client/create'},
  'GET /client' : { action : 'client/find'},
  'GET /client/:id/edit' : { action : 'client/edit'},
  'POST /client/update' : { action : 'client/update'},
  'POST /client/delete' : { action : 'client/delete'},

  'GET /fournisseur/new' : { view : 'fournisseur/create'},
  'GET /fournisseur/:id/edit' : { action : 'fournisseur/edit'},
  'GET /fournisseur/{id}' : { action : 'fournisseur/findOne'},
  'POST /fournisseur' : { action : 'fournisseur/create'},
  'POST /fournisseur/update' : { action : 'fournisseur/update'},
  'POST /fournisseur/delete' : { action : 'fournisseur/delete'},

  'GET /fournisseur' : { action : 'fournisseur/find'},

  'GET /product/new' : { view : 'product/create'},
  'GET /product/{id}' : { view : 'product/findOne'},
  'POST /product' : { action : 'product/save'},
  'GET /product' : { action : 'product/find'},
  'GET /product/:id/edit' : { action : 'product/edit'},
  'POST /product/update' : { action : 'product/update'},
  'POST /product/delete' : { action : 'product/delete'},


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝



  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
