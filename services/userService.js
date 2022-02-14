const db = require('../models')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserService {
    getUsers = async () => {

        try{
            const users = await db.User.findAll({raw: true})
            console.log("DB: \t " + "All Users displayed\n")
            return users
        } catch (error) {
            console.error(error);
            throw error
        }  
    }
    
    getUserByEmail = async (email) => {
    
        try{
            const user = await db.User.findAll({
                where: {
                    email
                },
                raw: true
            })
            console.log("DB: \t " + "User with email displayed\n")
            return user[0]
        } catch (error) {
            console.error(error);
            throw error
        }  
    }
    
    getUserById = async (id) => {
    
        try{
            const user = await db.User.findByPk(id, {raw: true})
            console.log("DB: \t " + "All Users with id displayed\n")
            return user
        } catch (error){
            console.error(error);
            throw error
        }
    }
    
    addNewUser = async (username , password, name, surname, email, role) => {
        
        try{
            const salt = bcrypt.genSaltSync(saltRounds)
            const hash = bcrypt.hashSync(password, salt)
    
            await db.User.findOrCreate({
                where: { username, email },
                defaults: {
                    uuid: uuidv4(),
                    password: hash,
                    name,
                    surname,
                    role
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
    
    updateUsername = async (id, username) => {
    
        // Multiple awaits in same try??
    
        try{
            //TRANSAKCIJA
            const user = await this.getUserById(id)
            //if(user){throw "Nesto"}
            await db.User.update({
                username
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
    
    deleteUser = async (id) => {
    
        try {
            // this || static addNewUser , UserService.addNewUser
            const user = await this.getUserById(id)
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
}

module.exports = new UserService()

// module.exports = {
//     getUsers,
//     getUsersByUsername,
//     getUserById,
//     addNewUser,
//     updateUsername,
//     deleteUser
// }