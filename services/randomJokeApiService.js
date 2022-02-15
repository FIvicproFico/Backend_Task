require('dotenv').config();
const axios = require('axios').default;
const emailService = require('../services/emailService')

class RandomJokeApiService {

    sendRequest = async () => {
        
        try{
            const response = await axios.get('http://api.icndb.com/jokes/random')
            console.log("API: \t Success")
            return response

        } catch (error) {
            console.error(error);
            throw error
        }  
    }

    sendNameSurnameRequest = async (name, surname, email) => {

        const parsedName = name.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').replace(/[š]/g, 's').replace(/[đ]/g, 'd').replace(/[ć]/g, 'c').replace(/[č]/g, 'c').replace(/[ž]/g, 'z').replace(/[^a-zA-Z ]/g, "")
        const parsedSurname = surname.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').replace(/[š]/g, 's').replace(/[đ]/g, 'd').replace(/[ć]/g, 'c').replace(/[č]/g, 'c').replace(/[ž]/g, 'z').replace(/[^a-zA-Z ]/g, "")

        try{
            const response = await axios.get(`http://api.icndb.com/jokes/random?firstName=${parsedName}&lastName=${parsedSurname}`)
            console.log("API: \t Success")

            const mailOptions = {
                from: process.env.MAIL,
                to: email,
                subject: 'Backend_Task',
                text: response.data.value.joke,
                // attachments: {
                //     path: 'public/images/Elephant.jpeg'
                // }
            }
            emailService.sendMail(mailOptions)
            return response

        } catch (error) {
            console.error(error);
            throw error
        }  
    }
}

module.exports = new RandomJokeApiService()