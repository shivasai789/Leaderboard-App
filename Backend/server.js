const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const userRoute = require("./routes/users.route");
const Users = require("./models/users.modals")
const ClaimHistory = require("./models/claimHistory.modals")

//initializing app
const app = express()

//middleware
app.use(express.json())
app.use(cors());

const port = process.env.PORT || 3000


// routes
app.use("/api/users", userRoute);

//test api call
app.get("/",(req,res) => {
    res.send("Hi from Backend")
})

//connect to database
mongoose.connect('mongodb+srv://mamidalashivasai789:oEWq0SNck7oyC7Zr@backend.6r92h.mongodb.net/LeaderboardDB?retryWrites=true&w=majority&appName=Backend')
  .then(() => {
     console.log('Connected to MongoDB')
     app.listen(port,() => {
        console.log(`server is running on port ${port} ...`)
    })
  }).catch(err => {
    console.log(err)
  });


