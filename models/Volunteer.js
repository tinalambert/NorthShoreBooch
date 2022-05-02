const mongoose = require('mongoose')
const { Schema } = require('mongoose'); 

const volunteerSchema = Schema({

    firstName: {
        type: String,
        required: [true, "First name is required!"],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, "Last name is required!"],
        trim: true,
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (email) => {
                const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g    
                const match = regex.test(email); 
                return match 
            },
            message: "Email must be valid!"
        }
    },
    phoneNumber: Number,
    task: String,
    assignedT: []   

})


module.exports = mongoose.model('Volunteer', volunteerSchema); 