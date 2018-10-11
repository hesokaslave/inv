/**
 * FournisseurControllerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    create : (req, res) => {
        const { nom, ville } = req.allParams();
        Fournisseur.create({ nom, ville }).fetch().then((four) => res.redirect('/fournisseur')).catch(err => res.serverError(err))
    },

    edit :  async (req,res) => {
      const { id } = req.allParams();
      console.log(id);
      let four = await Fournisseur.findOne({id});
      return res.view('fournisseur/edit',{four})
    },

    update : (req,res) => {
      const { id, nom, ville } = req.allParams();
      Fournisseur.update(id, {nom,ville}).then(() => res.redirect('/fournisseur')).catch(err => res.serverError(err))
    },

    find : (req,res) => {
        Fournisseur.find().then((fournisseurs) => res.view('fournisseur/index',{fournisseurs})).catch(err => res.serverError(err));
    },

    findOne : (req,res) => {
      console.log('findone');
        const { id } = req.allParams();
        Fournisseur.findOne({id}).then((fournisseur) => res.view('product/show',{fournisseur})).catch(err => res.serverError(err))
    },

    delete : (req,res) => {
        const { id } = req.allParams();
        Fournisseur.destroy({id}).then(() => res.redirect('/fournisseur')).catch((err) => res.serverError(err));
    }

};
