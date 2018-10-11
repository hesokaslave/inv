/**
 * LivraisonController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  new : async (req,res) => {
    let products = await Product.find();
    Client.find().then((clients) => res.view('livraison/create',{clients,products})).catch(err=>res.serverError(err))
  },

  find : (req,res) => {
    Livraison.find().populateAll().then(livraisons => res.view('livraison/index',{livraisons})).catch( err => res.serverError(err))
  },

  save : (req,res) => {
    const  { quantite, client_id, product_id } = req.allParams();
    Livraison.create({ quantite, product : product_id, client : client_id }).fetch().then( async (liv) => {
      await Product.addToCollection(product_id, 'livraisons').members([liv.id]);
      await Client.addToCollection(client_id, 'livraisons').members([liv.id]);
      return res.redirect('/livraison')
    })
  },

  delete : (req,res) => {
    const  { id, client_id } = req.allParams();
    Livraison.destroy({id}).then( async () => {
      await Product.removeFromCollection(id, 'livraisons').members([id]);
      await Client.removeFromCollection(client_id, 'livraisons').members([id]);
      return res.redirect('/livraison')
    })
  }

};
