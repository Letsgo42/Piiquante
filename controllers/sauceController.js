const { default: mongoose, isValidObjectId } = require('mongoose');
const Sauce = require('../models/sauceModel');

// GET api/sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
  .then(sauces => res.status(200).json(sauces))
  .catch(error => res.status(400).json( {error} ));
};


// GET api/sauces/:id
exports.getOneSauce = (req, res, next) => {
  Sauce.findById(req.params.id) //findOne( {_id: req.params.id}) ??????
  .then(sauce => res.status(200).json(sauce))
  .catch(error => res.status(404).json( {error} ));
};

 // '[
  //     name: "tabasco",
  //     manufacturer: "tabasco",
  //     description: "sauce au piment",
  //     heat: 8,
  //     mainPepper: "piment rouge",
  //     userId: "luc"
  // ]'

// POST api/sauces
exports.createSauce = (req, res, next) => {
  if (!req.body.image ||
      !req.body.sauce) {
    return res.status(400).send(new Error('Bad request!'));
  }

  //const image = req.body.image; ???? MULTER?

  const sauce = new Sauce({
    name: req.body.sauce.name,
    manufacturer: req.body.sauce.manufacturer,
    description: req.body.sauce.description,
    imageUrl: image,
    likes: 0,
    dislikes: 0,
    mainPepper: req.body.mainPepper,
    usersLiked: [],
    usersDisliked: [],
    userId: req.body._id,
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


