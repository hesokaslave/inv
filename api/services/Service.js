module.exports = {
  resetDB : async (done) => {
    await Client.destroy({});
    await Livraison.destroy({});
    await Reception.destroy({});
    await Fournisseur.destroy({});
    await Product.destroy({});

    if( await Fournisseur.count() === 0 ) await Fournisseur.createEach([
      { nom : 'Disway',ville : 'Casa'},
      { nom : 'Iris',ville : 'Tanger'},
      { nom : 'Joutech',ville : 'Fes'},
      { nom : 'HP',ville : 'Rabat'},
      { nom : 'HPS',ville : 'Casa'}
    ]);
    if( await Product.count() === 0 ) await Product.createEach([
      { nom : 'Clavier Asus', code : 'KB-ASUS', codeRFID : 'AB3X88-2018', codeABarres : '6112017000233', stock : 10},
      { nom : 'Tonner HP', code : '646A', codeRFID : 'DB4CC85-2018', codeABarres : '6112016000111', stock : 30},
      { nom : 'Souris Dell Wi-Fi', code : 'SRW-DELL', codeRFID : 'FDB48-2018', codeABarres : '6112016000142', stock : 30},
      { nom : 'Cable HDMI HP', code : 'KX3384', codeRFID : 'TYDB4-2018', codeABarres : '6112017000165', stock : 30},
      { nom : 'Disque Dur SSD Corsair 240GB', code : 'SSDCORS240', codeRFID : 'LPDB48-2018', codeABarres : '6112001000225', stock : 30},
      { nom : 'Disque Dur SSD Sandisk 128GB', code : 'SSDSANDISK128', codeRFID : 'UTDB485', codeABarres : '6112015000242', stock : 30}
    ])
    if( await Client.count() === 0 ) await Client.createEach([
      { nom : 'Aramex',ville : 'Casa'},
      { nom : 'DECATHLON',ville : 'Tanger'},
      { nom : 'McDonald',ville : 'Fes'},
      { nom : 'Dell',ville : 'Rabat'},
      { nom : 'DHL',ville : 'Casa'},
      { nom : 'Autre',ville : 'Casa'}
    ]);

    return done();
  }
}
