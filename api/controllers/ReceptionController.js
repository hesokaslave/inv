/**
 * ReceptionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  new : async (req,res) => {
    let products = await Product.find();
    Fournisseur.find().then((fournisseurs) => res.view('reception/create',{fournisseurs,products})).catch(err => res.serverError(err))
  },

  find : (req,res) => {
    Reception.find().populateAll().then(receptions => res.view('reception/index',{ receptions })).catch( err => res.serverError(err))
  },

  save : (req,res) => {
    const  { quantite, four_id, product_id } = req.allParams();
    Reception.create({ quantite, product : product_id, fournisseur : four_id }).fetch().then( async (recep) => {
      await Product.addToCollection(product_id, 'receptions').members([recep.id]);
      await Fournisseur.addToCollection(four_id, 'receptions').members([recep.id]);
      return res.redirect('/reception')
    })

  },

  delete : (req,res) => {
    const  { id, four_id } = req.allParams();
    Reception.destroy({id}).then( async () => {
      await Product.removeFromCollection(id, 'receptions').members([id]);
      await Fournisseur.removeFromCollection(four_id, 'receptions').members([id]);
      return res.redirect('/reception')
    })
  }
};
