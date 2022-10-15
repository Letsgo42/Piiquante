const Sauce = require('../models/sauceModel');
const fs = require('fs');


// GET ALL SAUCES: api/sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
  .then(sauces => res.status(200).json(sauces))
  .catch(error => res.status(400).json({ error }));
};


// GET ONE SAUCE: api/sauces/:id
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
  .then(sauce => res.status(200).json(sauce))
  .catch(error => res.status(404).json({ error }));
};


// POST NEW SAUCE: api/sauces
exports.createSauce = (req, res, next) => {
  if (!req.body.sauce) {
    return res.status(400).send(new Error('Bad request!'));
  }

  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  delete sauceObject.userId;
  // Save sauce properties and image
  const sauce = new Sauce({
    ...sauceObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
  });

  // Save sauce in database
  sauce.save()
  .then(() => res.status(201).json( { message: 'Sauce enregistrée' } ))
  .catch(error => res.status(400).json({ error }));
};


// PUT // MODIFY SAUCE: api/sauces/:id
exports.updateSauce = (req, res, next) => {
  // Check request body content to update imageUrl if there is an image
  const sauceObject = !req.file ? req.body : { 
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
  };

  // 
  delete sauceObject.userId;
  Sauce.findById(req.params.id)
  .then((sauce) => {
    // Check user authentification
    if (sauce.userId != req.auth.userId) {
      res.status(403).json({ message: 'Unauthorized request' });
    } else {
      // Update sauce in database
      Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce modifiée' }))
      .catch(error => res.status(403).json({ error }));
    }
  })
  .catch(error => res.status(400).json({ error })); 
};


// DELETE SAUCE: api/sauces/:id
exports.deleteSauce = (req, res, next) => {
  Sauce.findById(req.params.id)
  .then((sauce) => {
    // Check user authentification
    if (sauce.userId != req.auth.userId) {
      res.status(403).json({ message: 'Unauthorized request' });
    } else {
      // Delete image from folder
      const filename = sauce.imageUrl.split('/images/')[1];
      console.log(filename)
      fs.unlink(`images/${filename}`, () => {
        // Delete sauce from database
        Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce supprimée' }))
        .catch(error => res.status(403).json({ error }));
      });
    };
  })
  .catch(error => res.status(500).json({ error }));
};


// POST LIKE: api/sauces/:id/like
 exports.setLike = (req, res, next) => {
  //Function to remove userId from array of likes or dislikes
  function removeItem(arr, value) {
    let index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
      return 0;
    }
    return 1;
  }
  //Check if user like or dislike sauce
  Sauce.findOne({ _id : req.params.id } )
  .then(sauce => {
    const like = req.body.like;    
    switch (like) {
      // Update likes count if user like sauce
      case 1:
        if (sauce.usersLiked == 0 || (!sauce.usersLiked.includes(req.body.userId)) ) {
          sauce.usersLiked.push(req.body.userId);
          sauce.likes += 1;
        }
        break;
      // Update dislikes count if user dislikes sauce  
      case -1:
        if (sauce.usersDisliked == 0 || (!sauce.usersDisliked.includes(req.body.userId)) ) {
          sauce.usersDisliked.push(req.body.userId);
          sauce.dislikes += 1;
        }
        break;
      // Update count if user cancel his like/dislike
      case 0:
        if (removeItem(sauce.usersLiked, req.body.userId) == 0) {
          sauce.likes -= 1;
        } else if (removeItem(sauce.usersDisliked, req.body.userId) == 0) {
          sauce.dislikes -= 1;
        }
        break;
    }
    
    //Save likes count
    Sauce.updateOne({ _id: req.params.id }, sauce)
    .then(() => res.status(201).json({ message: 'Like enregistré' }))
    .catch(error => res.status(404).json({ error }));
  })
  .catch(error => res.status(404).json({ error }));
 };
