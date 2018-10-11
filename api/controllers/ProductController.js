/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  find : (req,res) => {
    Product.find().then((products) => res.view('product/index',{products}))
                  .catch(err => res.serverError(err));
  },

  save : (req,res) => {
    const { nom,code, quantite, codeRFID, codeABarres } = req.allParams();
    Product.create({ nom,code, stock : quantite, codeRFID, codeABarres })
           .then(() => res.redirect('/product'))
           .catch(err => res.serverError(err))
  },

  findOne : (req,res) => {
      const { id } = req.allParams();
      Product.findOne({id}).then((product) => res.view('product/show',{product})).catch(err => res.serverError(err))
  },

  delete : (req,res) => {
      const { id } = req.allParams();
      Product.destroy({id}).then(() => res.redirect('/product')).catch((err) => res.serverError(err));
  },

  edit :  async (req,res) => {
    const { id } = req.allParams();
    let product = await Product.findOne({id});
    return res.view('product/edit',{product})
  },

  update : (req,res) => {
    const { id, nom,code, codeABarres, codeRFID, quantite} = req.allParams();
    Product.update(id, {nom,code, codeABarres, codeRFID, stock : quantite}).then(() => res.redirect('/product')).catch(err => res.serverError(err))
  },

  inventaire : async (req,res) => {
      Product.find().then((prods) => res.view('product/inventaire',{products : prods})).catch(err => res.serverError(err))
  }

};
