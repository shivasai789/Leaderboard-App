const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const Users = require("./modals/users.modals")
const ClaimHistory = require("./modals/claimHistory.modals")

//initializing app
const app = express()

//middleware
app.use(express.json())
app.use(cors());

const port = process.env.PORT || 3000

app.get("/",(req,res) => {
    res.send("Hi from Backend")
})

app.get("/api/users",async (req,res) => {
    try{
        const users = await Users.find()
        res.status(200).json(users)
    }
    catch(error){
        res.status(400).json({ error_message: err.message })
    }
})

app.get("/api/users/rankings",async (req,res) => {
    try{
        const  users = await Users.find().sort({points: -1})
        res.status(200).json(users)
    }
    catch(error){
        res.status(400).json({ error_message: err.message })
    }
})

app.post("/api/user",async (req,res) => {
    try{
        const data = req.body 
        const user = await Users.create(data)
        res.status(200).json(user)
    }
    catch(err){
        res.status(400).json({ error_message: err.message })
    }
})


app.delete("/api/user/:id",async (req,res) => {
    try{
        const {id} = req.params
        const  user = await Users.findByIdAndDelete(id)
        res.status(200).json(user)
    }
    catch(error){
       res.status(400).json({ error_message: error.message }) 
    }
})

app.post("/api/claim",async (req,res) => {
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
})

mongoose.connect('mongodb+srv://shivasai789:shivasai_789@backend.6r92h.mongodb.net/LeaderboardDB?retryWrites=true&w=majority&appName=Backend')
  .then(() => {
     console.log('Connected to MongoDB')
     app.listen(port,() => {
        console.log("server is running...")
    })
  }).catch(err => {
    console.log(err)
  });


