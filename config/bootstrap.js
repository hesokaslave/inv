/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function(done) {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return done();
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)

  if( await Fournisseur.count() === 0 ) await Fournisseur.createEach([
    { nom : 'Disway',ville : 'Casa'},
    { nom : 'Iris',ville : 'Tanger'},
    { nom : 'Joutech',ville : 'Fes'},
    { nom : 'HP',ville : 'Rabat'},
    { nom : 'HPS',ville : 'Casa'}
  ]);
  if( await Product.count() === 0 ) await Product.createEach([
    { nom : 'Imprimante HP M102A', code : 'M102A', codeRFID : 'AB3X88', codeABarres : '345411534', stock : 10},
    { nom : 'PC Portable Dell XPS', code : 'M1530', codeRFID : 'DB4CC85', codeABarres : '3542253454', stock : 30},
    { nom : 'PC Portable Lenovo', code : 'AB485', codeRFID : 'FDB485', codeABarres : '3545333454', stock : 30},
    { nom : 'PC Portable ASUS ROG', code : 'KX3384', codeRFID : 'TYDB485', codeABarres : '3545346654', stock : 30},
    { nom : 'Apple Watch 4', code : 'APPW4', codeRFID : 'LPDB485', codeABarres : '3544453454', stock : 30},
    { nom : 'Samsung Gear 3', code : 'SMG3', codeRFID : 'UTDB485', codeABarres : '3545553454', stock : 30}
  ])
  if( await Client.count() === 0 ) await Client.createEach([
    { nom : 'Aramex',ville : 'Casa'},
    { nom : 'DECATHLON',ville : 'Tanger'},
    { nom : 'McDonald',ville : 'Fes'},
    { nom : 'Dell',ville : 'Rabat'},
    { nom : 'DHL',ville : 'Casa'}
  ]);

  return done();

};
