const db = require('../models')

//TODO: Make Class for exporting

const getUsers = async () => {

    console.log("GET: \t\t /users")
    console.log("Response: \t " + "All Users displayed\n")

    try{
        const users = await db.User.findAll({raw: true})
        //console.log(users)
        return users
    }
    catch (error) {
        console.error(error);
    }  
}

const postUsers = async () => {
    console.log("POST: \t\t /users")
}

module.exports = {
    getUsers,
    postUsers,
}