const express = require("express");
const router = express.Router();
const Volunteer = require("../models/Volunteer")


router.get("/", (req, res) => {
   res.render("volunteer", {title: "Volunteer Registration"})
})

router.post("/volunteer", async (req, res) => {
   const { firstName, lastName, email, phoneNumber, task } = req.body;

// if(!firstName || !lastName || !email || !phoneNumber || !task) {
//    return res.render('volunteer', {message: 'Please fill the form out completely!'})
// }

const uVolunteer = await Volunteer.findOne({ email: email })

if(uVolunteer) {
   return res.render('register', { message: "Email has already been used!"});
} else {

   console.log('volunteer created!')
   
   const newVolunteer = new Volunteer({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      task: task
   });

   await newVolunteer.save();
   res.redirect('/');
}

}); 

module.exports = router;