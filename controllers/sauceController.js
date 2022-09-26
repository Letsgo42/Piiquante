const Sauce = require('../models/Sauce');

// GET api/sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
  .then(sauces => res.status(200).json( {message: 'Get successfull}'} ))
  .catch(error => res.status(400).json( {error} ));
    // {
    //   _id: '109418',
    //   name: 'tabasco',
    //   manufacturer: 'tabasco',
    //   description: 'sauce au piment',
    //   heat: 8,
    //   likes: 42,
    //   dislikes: 42,
    //   imageUrl: './models/images/tabasco.png',
    //   mainPepper: 'piment rouge',
    //   usersLiked: ['william', 'jo'],
    //   usersDisliked: ['stella', fred],
    //   userId: '83015'
    // },
};


// GET api/sauces/:id
exports.getOneSauce = (req, res, next) => {
  Sauce.findById(req.params.id) //findOne( {_id: req.params.id}) ?
  .then(sauce => res.status(200).json(sauce))
  .catch(error => res.status(404).json( {error} ));
};


// POST api/sauces
exports.createSauce = (req, res, next) => {
  if (!req.body.imageUrl) {
    return res.status(400).send(new Error('Bad request!'));
  }

  delete req.body._id;
  const sauce = new Sauce({
    imageUrl: req.body.imageUrl,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: []
  });
  sauce.save()
  .then(() => res.status(201).json( {message: 'Sauce enregistrée !'} )) // + Verb ??? //
  .catch(() => res.status(400).json( {error} ));
};


// // PUT api/sauces/:id
// exports.updateSauce = (req, res, next) => {
//   if (req.body.imageUrl) {
//     // get & update imageUrl  ?
//   } else if (!req.body.sauce) {
//     ...req.body
//   }
// };


