/**
 * Client.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    nom : {
      type : 'string'
    },

    ville : {
      type : 'string'
    },

    livraisons : {
      collection : 'Livraison',
      via : 'client'
    },

  },

};
