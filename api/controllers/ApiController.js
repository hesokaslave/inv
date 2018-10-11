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

    manuelLivraison : async (req,res) => {
      const { actor, product } = req.allParams()
      let prods = await Product.find({ code : product});
      let clients = await Client.find({ nom : actor });
      Livraison.create({ quantite : 1, product : prods[0].id, client : clients[0].id }).fetch().then( async (liv) => {
        await Product.addToCollection(prods[0].id, 'livraisons').members([liv.id]);
        await Client.addToCollection(clients[0].id, 'livraisons').members([liv.id]);
        sails.sockets.blast('newOp',{operation : 'Livraison',type : 'Client', actor,product})
        return res.ok({ok : 'ok'});
      })
    },

    manuelReception : async (req,res) => {
      const { actor, product } = req.allParams()
      let prods = await Product.find({ code : product});
      let fours = await Fournisseur.find({ nom : actor });
      Reception.create({ quantite : 1, product : prods[0].id, fournisseur : fours[0].id }).fetch().then( async (liv) => {
        await Product.addToCollection(prods[0].id, 'receptions').members([liv.id]);
        await Fournisseur.addToCollection(fours[0].id, 'receptions').members([liv.id]);
        sails.sockets.blast('newOp',{operation : 'Réception',type: 'Fournisseur', actor,product})
        return res.ok({ok : 'ok'});
      })
    }

};
