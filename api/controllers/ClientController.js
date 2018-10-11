/**
 * ClientController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  create : (req, res) => {
      const { nom, ville } = req.allParams();
      Client.create({ nom, ville }).fetch().then((cl) => res.redirect('/client')).catch(err => res.serverError(err))
  },

  delete : (req,res) => {
      const { id } = req.allParams();
      Client.destroy({id}).then(() => res.redirect('/client')).catch((err) => res.serverError(err));
  },

  edit :  async (req,res) => {
    const { id } = req.allParams();
    let client = await Client.findOne({id});
    return res.view('client/edit',{client})
  },

  update : (req,res) => {
    const { id, nom,ville} = req.allParams();
    Client.update(id, {nom,ville}).then(() => res.redirect('/client')).catch(err => res.serverError(err))
  },

  find : (req,res) => {
      Client.find().then((clients) => res.view('client/index',{clients})).catch(err => res.serverError(err));
  },

  findOne : (req,res) => {
    const { id } = req.allParams();
    Client.findOne({id}).then((client) => res.view('client/show',{client})).catch(err => res.serverError(err))
  }


};
