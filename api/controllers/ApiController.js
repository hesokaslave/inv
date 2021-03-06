/**
 * ApiController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  resetDB : async(req,res) => {
      Service.resetDB(() => {
        return res.redirect('back');
      })
  },

    connect  : async (req,res) => {
        let products = await Product.find();
        let fournisseurs = await Fournisseur.find();
        let clients = await Client.find();
        return res.json({products,fournisseurs,clients})
    },

    findByCode : (req,res) => {
        const { code } = req.allParams();
        Product.find({code}).limit(1).then((product) => res.json({product})).catch(err => res.serverError(err))
    },

    findByBarcode : (req,res) => {
        const { codeABarres } = req.allParams();
        Product.find({codeABarres}).limit(1).then((product) => res.json({product})).catch(err => res.serverError(err))
    },

    manuelLivraison : async (req,res) => {
      const { actor, product,quantite} = req.allParams()
      let prods = await Product.find({ code : product});
      let clients = await Client.find({ nom : actor });
      if( prods.length === 0 ) return res.ok({ 'error' : ` Produit Introuvable ! (${product}) `})
      if( clients.length === 0 ) return res.ok({ 'error' : ` Client Introuvable ! (${actor}) `})

      if(prods[0].stock < Number(quantite)) return res.ok({ 'error' : `Stock Insuffisant ! ( Stock : ${prods[0].stock} || Qté : ${quantite})`})
      Livraison.create({ quantite, product : prods[0].id, client : clients[0].id }).fetch().then( async (liv) => {
        await Product.addToCollection(prods[0].id, 'livraisons').members([liv.id]);
        await Client.addToCollection(clients[0].id, 'livraisons').members([liv.id]);
        await Product.update(prods[0].id,{stock : (prods[0].stock - Number(quantite))})
        sails.sockets.blast('newOp',{operation : 'Livraison',type : 'Client', actor,product,quantite})
        return res.ok({'stock' : prods[0].stock - Number(quantite)});
      })
    },

    manuelReception : async (req,res) => {
      const { actor, product,quantite } = req.allParams()
      console.log({ actor, product,quantite });
      let prods = await Product.find({ code : product});
      let fours = await Fournisseur.find({ nom : actor });

      if( prods.length === 0 ) return res.ok({ 'error' : ` Produit Introuvable ! (${product}) `})
      if( fours.length === 0 ) return res.ok({ 'error' : ` Fournisseur Introuvable ! (${actor}) `})

      Reception.create({ quantite, product : prods[0].id, fournisseur : fours[0].id }).fetch().then( async (liv) => {
        await Product.addToCollection(prods[0].id, 'receptions').members([liv.id]);
        await Fournisseur.addToCollection(fours[0].id, 'receptions').members([liv.id]);
        await Product.update(prods[0].id,{stock : (prods[0].stock + Number(quantite))})
        sails.sockets.blast('newOp',{operation : 'Réception',type: 'Fournisseur', actor,product,quantite})
        return res.ok({'stock' : prods[0].stock + Number(quantite)});
      })
    },

    barsLivraison : async (req,res) => {
      const { actor, barCode,quantite} = req.allParams()
      let prods = await Product.find({ codeABarres : barCode});
      let clients = await Client.find({ nom : actor });

      if( prods.length === 0 ) return res.ok({ 'error' : ` Produit Introuvable ! (${barCode}) `})
      if( clients.length === 0 ) return res.ok({ 'error' : ` Client Introuvable ! (${actor}) `})

      if(prods[0].stock < Number(quantite)) return res.ok({ 'error' : `Stock Insuffisant ! ( Stock : ${prods[0].stock} || Qté : ${quantite})`})

      Livraison.create({ quantite, product : prods[0].id, client : clients[0].id }).fetch().then( async (liv) => {
        await Product.addToCollection(prods[0].id, 'livraisons').members([liv.id]);
        await Client.addToCollection(clients[0].id, 'livraisons').members([liv.id]);
        await Product.update(prods[0].id,{stock : (prods[0].stock - Number(quantite))})
        sails.sockets.blast('newOp',{operation : 'Livraison',type : 'Client', actor, product : prods[0].code, quantite})
        return res.ok({'stock' : prods[0].stock - Number(quantite)});
      })
    },

    barsReception : async (req,res) => {
      const { actor, barCode,quantite } = req.allParams()
      let prods = await Product.find({ codeABarres : barCode});
      let fours = await Fournisseur.find({ nom : actor });
      console.log(barCode);
      if( prods.length === 0 ) return res.ok({ 'error' : ` Produit Introuvable ! (${barCode}) `})
      if( fours.length === 0 ) return res.ok({ 'error' : ` Fournisseur Introuvable ! (${actor}) `})

      Reception.create({ quantite, product : prods[0].id, fournisseur : fours[0].id }).fetch().then( async (liv) => {
        await Product.addToCollection(prods[0].id, 'receptions').members([liv.id]);
        await Fournisseur.addToCollection(fours[0].id, 'receptions').members([liv.id]);
        await Product.update(prods[0].id,{stock : (prods[0].stock + Number(quantite))})
        sails.sockets.blast('newOp',{operation : 'Réception',type: 'Fournisseur', actor, product : prods[0].code, quantite})
        return res.ok({'stock' : prods[0].stock + Number(quantite)});
      })
    }

};
