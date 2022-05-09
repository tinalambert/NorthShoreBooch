const express = require("express");
const router = express.Router();
const Plant = require("../models/Plant");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

router.get("/", async (req, res) => {
  //const { ScientificName, CommonName, State, Duration, GrowthRate, AdaptedCoarseSoils, AdaptedMediumSoils, AdaptedFineSoils, ShadeTolerance, RootDepthMinimum, Precipitation_Minimum, Precipitation_Maximum, BloomPeriod } = req.body
  let token;
  let decoded;
  let isAdmin;
  let loggedIn = false;
  if (req.cookies.loggedIn) {
    loggedIn = true;
    token = req.cookies.loggedIn;
    decoded = jwt.verify(token, secret, { complete: true });
    isAdmin = decoded.payload.isAdmin;
  }

  let plants = [];
  
  plants = await Plant.find({ CommonName: ["Lavender", "Hemp", "Lemongrass", "Kalo (Taro)", "Noni", "Banana", "Papaya", "Peppermint", "lilikoi (Passion Fruit) ", "Tulsi (Holy Basil)", "Moringa", "Olena (Hawaiian Turmeric)", "Kaukani (Hawaiian ginger)" ] })
  //console.log(plants)
  plants.forEach((plant) => {
    plant.isAdmin = isAdmin;
  })
  res.render("plants", { title: "Plant Care Guide", plants, loggedIn, isAdmin });
});

router.post('/', async (req, res) => {
  const { ScientificName, CommonName, State, Duration, GrowthRate, AdaptedCoarseSoils, AdaptedMediumSoils, AdaptedFineSoils, ShadeTolerance, RootDepthMinimum, Precipitation_Minimum, Precipitation_Maximum, BloomPeriod, imageUrl } = req.body;

  const newPlant = new Plant({
    ScientificName: ScientificName, 
    CommonName: CommonName, 
    State: State, 
    Duration: Duration, 
    GrowthRate: GrowthRate, 
    AdaptedCoarseSoils: AdaptedCoarseSoils, 
    AdaptedMediumSoils: AdaptedMediumSoils, 
    AdaptedFineSoils: AdaptedFineSoils, 
    ShadeTolerance: ShadeTolerance, 
    RootDepthMinimum: RootDepthMinimum, 
    Precipitation_Minimum: Precipitation_Minimum, 
    Precipitation_Maximum: Precipitation_Maximum, 
    BloomPeriod: BloomPeriod, 
    imageUrl: imageUrl,
  });

  await newPlant.save((err) => {
    if(err) {
      const error = newPlant.validateSync().errors;
        if(error.CommonName) {
            res.render('plants', {message: error.CommonName.message});
        }
        if(error.ScientificName) {
            res.render('plants', {message: error.ScientificName.message});
        }
    } else {
            console.log('New Plant added to database.');
            res.redirect('plants');
        }         
    });
  });

  /////// Adding Update Plant Functionality /////////
router.post('/plant', async (req, res) => {
    let info = req.body;
    let id = req.params.id;
    await Plant.findByIdAndUpdate(id, info);
    res.redirect('/plants/');
  });
  

module.exports = router;