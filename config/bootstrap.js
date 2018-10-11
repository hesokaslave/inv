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

  if( await Fournisseur.count() === 0 ) await Fournisseur.create({ nom : 'Disway',ville : 'Casa'});
  if( await Product.count() === 0 ) await Product.createEach([
    { nom : 'Souris', code : 'SR45', codeRFID : 'AB388', codeABarres : '3454534', stock : 10},
    { nom : 'PC', code : 'BCM746', codeRFID : 'DB485', codeABarres : '35453454', stock : 30}

  ])
  if( await Client.count() === 0 ) await Client.create({ nom : 'JADLI',ville : 'Rabat'});

  return done();

};
