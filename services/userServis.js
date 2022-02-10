const db = require('../models')
const { v4: uuidv4 } = require('uuid');
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
        console.error(error);
    }
}

const addNewUser = async (username , password, role) => {

    try{
        const newUser = db.User.findOrCreate({
            where: { username: username, password: password },
            defaults: {
                uuid: uuidv4(),
                role: role
            }
        })
    } catch (error){
        console.error(error)
    }
}

const updateUsername = async (id, username) => {
    
    try {
        getUserById(id)
        .then(user => {
            db.User.update({
                username: username
            },{
                where:{
                    id: user.id
                }
            })
        })
        .catch(err => console.log(err))

    } catch (error) {
        console.error(error)
    }
}

const deleteUser = async (id) => {

    try {
        getUserById(id)
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