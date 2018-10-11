/**
 * ApiController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    connect  : async (req,res) => {
        let products = await Product.find();
        let fournisseurs = await Fournisseur.find();
        let clients = await Client.find();

        return res.json({products,fournisseurs,clients})
    },

    manuelLivraison : (req,res) => {
      const { actor, product } = req.allParams()
      console.log('manuel livraison');
      console.log({ actor, product });
      return res.ok({ok : 'ok'});
    },

    manuelReception : (req,res) => {
      const { actor, product } = req.allParams()
      console.log('manuel reception');
      console.log({ actor, product });
      return res.ok({ok : 'ok'});
    }

};
