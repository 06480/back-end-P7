const postModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.readPost = (req, res) => {
    postModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log('error to get data : ' + err);
    })
}

module.exports.createPost = async (req, res) => {
    const newPost = new postModel({
        userId: req.body.userId,
        message: req.body.message,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likers: []
    });

    try {
        const post = await newPost.save();
        return res.status(201).json(post)
    } catch (err) {
        return res.status(400).send(err);
    }
}

module.exports.updatePost = (req, res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown: " + req.params.id);

    const updatedRecord = {
        message: req.body.message,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }

    postModel.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRecord },
        { new: true },
        (err, docs) => {
           if (!err) res.send(docs);
           else console.log("Uptade error : " + err)
        }
    )
}

module.exports.deletePost = (req, res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown: " + req.params.id);

    postModel.findByIdAndRemove(
        req.params.id,
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Delete error : " + err)
        }
        
    )
}

module.exports.likePost = async (req, res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown: " + req.params.id);

    try {
        await postModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { likers: req.body.id }
            },
            { new: true },
            (err, docs) => {
                if (err) return res.status(400).send(err);
            }
        );
        await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { likes: req.params.id }
            },
            
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs);
                else return res.status(400).send(err);
                
            }
        );
    } catch (err) {
        return res.status(400).send(err);
    }
}

module.exports.unlikePost = async (req, res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown: " + req.params.id);
}
