const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



// const createToken = (id) => {
//     return jwt.sign({id}, process.env.TOKEN_SECRET, {
//         expiresIn: maxAge
//     })
// };

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

// module.exports.signIn = async (req, res) => {
//     const { email, password } = req.body

//     try{
//       const user = await UserModel.login(email, password);
//       const token = createToken(user._id);
//       res.cookie('jwt', token, { httpOnly: true, maxAge:maxAge});
//       res.status(200).json({ user: user._id });
//     } catch (err) {
//         res.status(500).json(err)
//     }
// }

module.exports.logOut = async (req, res) => {

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
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error: "erreur1" }));
    })
    .catch(error => res.status(500).json({ error: "erreur2" }));
};