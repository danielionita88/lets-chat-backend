const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.updateUser = async (req, res) => {
  if (req.body.user_id === req.params.id) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (e) {
        res.status(500).json(e);
      }
    }
    try{
        await User.findByIdAndUpdate(req.body.user_id,{$set: req.body})
        res.status(200).json('Account updated succesfully!')
    }catch(e){
        res.status(500).json(e)
    }

  } else {
    res.status(403).json("Access denied!");
  }
};

exports.deleteUser = async(req, res) => {
    if(req.body.user_id === req.params.id){
        try {
            await User.findByIdAndDelete(req.body.user_id)
            res.status(200).json('Account deleted succesfully!')
        }catch(e){
            res.status(500).json(e)
        }
    }else{
        req.status(403).json("You can delete only your account")
    }
}