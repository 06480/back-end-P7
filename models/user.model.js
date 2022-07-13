//importation du package "mongoose" de Node
const mongoose = require('mongoose');
//importation du package "mongoose-unique-validator" de Node
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

//création du modèle utilisateur
const UserModel = mongoose.Schema({
  pseudo: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
  likes: { type: [String] },
},
{
    timestamps: true
}
);

UserModel.pre("save", async function(next){
    const salt = await bcrypt .genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserModel.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
}

//utilisation du plugin permettant un email unique
UserModel.plugin(uniqueValidator);

//export du modèle utilisateur
module.exports = mongoose.model('User', UserModel);