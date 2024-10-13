const Users = require("../models/users.modals")
const ClaimHistory = require("../models/claimHistory.modals")

const getUsers = async (req,res) => {
    try{
        const users = await Users.find()
        res.status(200).json(users)
    }
    catch(error){
        res.status(400).json({ error_message: err.message })
    }
}

const getRankings = async (req,res) => {
    try{
        const  users = await Users.find().sort({points: -1})
        res.status(200).json(users)
    }
    catch(error){
        res.status(400).json({ error_message: err.message })
    }
}

const createUser = async (req,res) => {
    try{
        const data = req.body 
        const user = await Users.create(data)
        res.status(200).json(user)
    }
    catch(err){
        res.status(400).json({ error_message: err.message })
    }
}

const deleteUser = async (req,res) => {
    try{
        const {id} = req.params
        const  user = await Users.findByIdAndDelete(id)
        res.status(200).json(user)
    }
    catch(error){
       res.status(400).json({ error_message: error.message }) 
    }
}

const claimPoints = async (req,res) => {
    try{
        const { userId } = req.body;

    // Generate random points between 1-10
    const points = Math.floor(Math.random() * 10) + 1;

    const user = await Users.findById(userId);
    user.points += points;
    await user.save();

    const claimHistory = new ClaimHistory({ userId, points });
    await claimHistory.save();

    const rankings = await Users.find().sort({ points: -1 });

    res.status(200).json({ user, points, rankings });
    }
    catch(error){
        res.status(400).json({ error_message: err.message })
    }
}


module.exports = {
    getUsers,
    getRankings,
    createUser,
    deleteUser,
    claimPoints
  };