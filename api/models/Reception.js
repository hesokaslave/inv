/**
 * Reception.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    quantite : {
      type : 'number'
    },


    fournisseur : {
      model : 'Fournisseur'
    },

    product : {
      model : 'product'
    }


  },


};
