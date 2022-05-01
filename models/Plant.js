const mongoose = require('mongoose');
const { Schema } = require('mongoose');


const plantSchema = Schema({
    name: String, 
    description: String,  
    sunExpo: String,
    harvestDesc: String
})

module.exports = mongoose.model('Plant', plantSchema);



///////  Plants to Grow ////////

// kaukani (Hawaiian ginger)
// olena (Hawaiian turmeric)
// noni
// lavender
// Hemp (for CBD extraction and fiber)
// medical cannabis (to be used for plant medicine for patients with a 329 card)
// lemongrass
// lavender
// peppermint
// banana
// papaya
// kalo (taro)
// lilikoi(passion fruit) 
// moringa 
// tulsi (holy basil)
// other vegetables
// other medicinal plants