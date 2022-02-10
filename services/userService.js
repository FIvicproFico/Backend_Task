const db = require('../models')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//TODO: Make Class for exporting

const getUsers = async () => {

    try{
        const users = await db.User.findAll({raw: true})
        console.log("Response: \t " + "All Users displayed\n")
        return users
    } catch (error) {
        console.error(error);
    }  
}

const getUserById = async (id) => {

    try{
        const user = await db.User.findByPk(id, {raw: true})
        return user
    } catch (error){
        console.log("Error handler for getUserByID")
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
    } catch (error){
        //throw new Error(error); // !!! Ne valja ovako!
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

    try {
        const user = await getUserById(id)
        try{
            await db.User.update({
                username: username
            },{
                where: {
                    id: user.id
                }
            })
        } catch (error){
            console.error(error)
            throw error
        }
    } catch (error) {
        console.error(error)
        throw error
    }
    
    // try {
    //     await getUserById(id)
    //     .then(user => {
    //         db.User.update({
    //             username: username
    //         },{
    //             where:{
    //                 id: user.id
    //             }
    //         })
    //     })
    //     .catch(err => console.log(err))

    //     //Da ovdje imam još ond atreba handleat!!! ?

    // } catch (error) {
    //     console.error(error)
    // }
}

const deleteUser = async (id) => {

    try {
        await getUserById(id)
        .then(user => {
            db.User.destroy({
                where: {
                    id: user.id
                }
            })
        })
        .catch(err => console.log(err))

    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    getUsers,
    getUserById,
    addNewUser,
    updateUsername,
    deleteUser
}