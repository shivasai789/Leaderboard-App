const express = require("express");
const router = express.Router();
const {getUsers,getRankings,createUser,deleteUser,claimPoints} = require("../controllers/users.controllers")


router.get("/",getUsers)

router.get("/rankings",getRankings)

router.post("/",createUser)

router.delete("/:id",deleteUser)

router.post("/claim",claimPoints)



module.exports = router;