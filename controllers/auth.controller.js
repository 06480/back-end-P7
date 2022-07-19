const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: '24h'
    })
};

module.exports.signUp = async (req, res) => {
    const {pseudo, email, password} = req.body

    try{
        const user = await UserModel.create({pseudo, email, password});
        res.status(201).json({ user: user._id })
    }
    catch(err){
        res.status(200).send({ err })
    }
}

module.exports.signIn = (req, res, next) => {
  UserModel.findOne({ email: req.body.email })
  .then(user => {
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
    bcrypt.compare(req.body.password, user.password)
      .then(valid => {   
        if (!valid) {
          return res.status(401).json({ error: 'Mot de passe incorrect !' });
        }
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true })
        .status(200).json({
          userId: user._id
        });
      })
      .catch(error => res.status(500).json({ error: error }));
  })
  .catch(error => res.status(500).json({ error: "erreur2" }));
};

module.exports.logOut = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}

