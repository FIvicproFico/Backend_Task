const db = require('../models')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//TODO: Make Class for exporting

const getUsers = async () => {

    try{
        const users = await db.User.findAll({raw: true})
        console.log("DB: \t " + "All Users displayed\n")
        return users
    } catch (error) {
        console.error(error);
        throw error
    }  
}

const getUsersByUsername = async (username) => {

    try{
        const users = await db.User.findAll({
            where: {
                username: username
            }
        }, {raw: true})
        console.log("DB: \t " + "All Users with username displayed\n")
        return users
    } catch (error) {
        console.error(error);
        throw error
    }  
}

const getUserById = async (id) => {

    try{
        const user = await db.User.findByPk(id, {raw: true})
        console.log("DB: \t " + "All Users with id displayed\n")
        return user
    } catch (error){
        console.error(error);
        throw error
    }
}

const addNewUser = async (username , password, role) => {
    
    try{
        const salt = bcrypt.genSaltSync(saltRounds)
        const hash = bcrypt.hashSync(password, salt)

        await db.User.findOrCreate({
            where: { username: username, password: hash },
            defaults: {
                uuid: uuidv4(),
                role: role
            }
        })
        console.log("DB: \t " + "New User added!\n")
    } catch (error){
        // throw new Error(error); // !!! Ne valja ovako!
        // let moj_error = new Error('Moj_Error!!!');
        // throw moj_error
        console.error(error)
        throw error
    }

    // --------------IN CASE OF ASYNC HASH FUNCTION------------

    // const promise = new Promise((resolve, reject) => {
    //     bcrypt.genSalt(saltRounds, (err, salt) => {
    //         if (err) {
    //             console.log(err)
    //             return reject("Puka je salt")           
    //         }
    //         bcrypt.hash(password, salt, async (err, hash) => {
    //            if (err){
    //                console.log(err)
    //                return reject("Puka je hash")
    //            }
    //            try {
    //                 await db.User.findOrCreate({
    //                     where: { username: username, password: hash },
    //                     defaults: {
    //                         uuid: uuidv4(),
    //                         role: role
    //                     }
    //                 })
    //                 resolve("Uspijeh")
    //             } catch (error) {
    //                 reject("An error from DB")
    //             }
    //         });
    //     });
    // })
    // try {
    //     await promise
    // } catch (error) {
    //    throw error
    // }
    // console.log("Here")
}

const updateUsername = async (id, username) => {

    // Multiple awaits in same try??

    try{
        const user = await getUserById(id)
        await db.User.update({
            username: username
        },{
            where: {
                id: user.id
            }
        })
        console.log("DB: \t " + "Username updated!\n")
    } catch (error){
        console.error(error)
        throw error
    }
}

const deleteUser = async (id) => {

    try {
        const user = await getUserById(id)
        await db.User.destroy({
            where: {
                id: user.id
            }
        })
        console.log("DB: \t " + "User delete!\n")
    } catch (error) {
        console.error(error)
        throw error
    }
}

module.exports = {
    getUsers,
    getUsersByUsername,
    getUserById,
    addNewUser,
    updateUsername,
    deleteUser
}