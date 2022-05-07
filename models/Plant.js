const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const plantSchema = Schema({
  plantNum: {
    type: Number,
  },
  "betydb.species.id": {
    type: Number,
  },
  Genus: {
    type: String,
  },
  Species: {
    type: String,
  },
  ScientificName: {
    type: String,
  },
  CommonName: {
    type: String,
  },
  notes: {
    type: String,
  },
  created_at: {
    type: String,
  },
  updated_at: {
    type: String,
  },
  AcceptedSymbol: {
    type: String,
  },
  SynonymSymbol: {
    type: String,
  },
  Symbol: {
    type: String,
  },
  PLANTS_Floristic_Area: {
    type: String,
  },
  State: {
    type: String,
  },
  Category: {
    type: String,
  },
  Family: {
    type: String,
  },
  FamilySymbol: {
    type: String,
  },
  FamilyCommonName: {
    type: String,
  },
  xOrder: {
    type: String,
  },
  SubClass: {
    type: String,
  },
  Class: {
    type: Number,
  },
  SubDivision: {
    type: String,
  },
  Division: {
    type: String,
  },
  SuperDivision: {
    type: String,
  },
  SubKingdom: {
    type: String,
  },
  Kingdom: {
    type: String,
  },
  ITIS_TSN: {
    type: Number,
  },
  Duration: {
    type: String,
  },
  PLANTS_Floristic_Area: {
    type: String,
  },
  GrowthHabit: {
    type: String,
  },
  NativeStatus: {
    type: String,
  },
  FederalNoxiousStatus: {
    type: String,
  },
  FederalNoxiousCommonName: {
    type: String,
  },
  StateNoxiousStatus: {
    type: String,
  },
  StateNoxiousCommonName: {
    type: String,
  },
  Invasive: {
    type: String,
  },
  Federal_TE_Status: {
    type: String,
  },
  State_TE_Status: {
    type: String,
  },
  State_TE_Common_Name: {
    type: String,
  },
  NationalWetlandIndicatorStatus: {
    type: String,
  },
  RegionalWetlandIndicatorStatus: {
    type: String,
  },
  ActiveGrowthPeriod: {
    type: String,
  },
  AfterHarvestRegrowthRate: {
    type: String,
  },
  Bloat: {
    type: String,
  },
  C2N_Ratio: {
    type: String,
  },
  CoppicePotential: {
    type: String,
  },
  FallConspicuous: {
    type: String,
  },
  FireResistance: {
    type: String,
  },
  FlowerColor: {
    type: String,
  },
  FlowerConspicuous: {
    type: String,
  },
  FoliageColor: {
    type: String,
  },
  FoliagePorositySummer: {
    type: String,
  },
  FoliagePorosityWinter: {
    type: String,
  },
  FoliageTexture: {
    type: String,
  },
  FruitColor: {
    type: String,
  },
  FruitConspicuous: {
    type: String,
  },
  GrowthForm: {
    type: String,
  },
  GrowthRate: {
    type: String,
  },
  MaxHeight20Yrs: {
    type: Number,
  },
  MatureHeight: {
    type: Number,
  },
  KnownAllelopath: {
    type: String,
  },
  LeafRetention: {
    type: String,
  },
  Lifespan: {
    type: String,
  },
  LowGrowingGrass: {
    type: String,
  },
  NitrogenFixation: {
    type: String,
  },
  ResproutAbility: {
    type: String,
  },
  Shape_and_Orientation: {
    type: String,
  },
  Toxicity: {
    type: String,
  },
  AdaptedCoarseSoils: {
    type: String,
  },
  AdaptedMediumSoils: {
    type: String,
  },
  AdaptedFineSoils: {
    type: String,
  },
  AnaerobicTolerance: {
    type: String,
  },
  CaCO3Tolerance: {
    type: String,
  },
  ColdStratification: {
    type: String,
  },
  DroughtTolerance: {
    type: String,
  },
  FertilityRequirement: {
    type: String,
  },
  FireTolerance: {
    type: String,
  },
  MinFrostFreeDays: {
    type: Number,
  },
  HedgeTolerance: {
    type: String,
  },
  MoistureUse: {
    type: String,
  },
  pH_Minimum: {
    type: Number,
  },
  pH_Maximum: {
    type: Number,
  },
  Min_PlantingDensity: {
    type: Number,
  },
  Max_PlantingDensity: {
    type: Number,
  },
  Precipitation_Minimum: {
    type: Number,
  },
  Precipitation_Maximum: {
    type: Number,
  },
  RootDepthMinimum: {
    type: Number,
  },
  SalinityTolerance: {
    type: String,
  },
  ShadeTolerance: {
    type: String,
  },
  TemperatureMinimum: {
    type: Number,
  },
  BloomPeriod: {
    type: String,
  },
  CommercialAvailability: {
    type: String,
  },
  FruitSeedAbundance: {
    type: String,
  },
  FruitSeedPeriodBegin: {
    type: String,
  },
  FruitSeedPeriodEnd: {
    type: String,
  },
  FruitSeedPersistence: {
    type: String,
  },
  Propogated_by_BareRoot: {
    type: String,
  },
  Propogated_by_Bulbs: {
    type: String,
  },
  Propogated_by_Container: {
    type: String,
  },
  Propogated_by_Corms: {
    type: String,
  },
  Propogated_by_Cuttings: {
    type: String,
  },
  Propogated_by_Seed: {
    type: String,
  },
  Propogated_by_Sod: {
    type: String,
  },
  Propogated_by_Sprigs: {
    type: String,
  },
  Propogated_by_Tubers: {
    type: String,
  },
  Seeds_per_Pound: {
    type: Number,
  },
  SeedSpreadRate: {
    type: String,
  },
  SeedlingVigor: {
    type: String,
  },
  SmallGrain: {
    type: String,
  },
  VegetativeSpreadRate: {
    type: String,
  },
  Berry_Nut_Seed_Product: {
    type: String,
  },
  ChristmasTreeProduct: {
    type: String,
  },
  FodderProduct: {
    type: String,
  },
  FuelwoodProduct: {
    type: String,
  },
  LumberProduct: {
    type: String,
  },
  NavalStoreProduct: {
    type: String,
  },
  NurseryStockProduct: {
    type: String,
  },
  PalatableBrowseAnimal: {
    type: String,
  },
  PalatableGrazeAnimal: {
    type: String,
  },
  PalatableHuman: {
    type: String,
  },
  PostProduct: {
    type: String,
  },
  ProteinPotential: {
    type: String,
  },
  PulpwoodProduct: {
    type: String,
  },
  VeneerProduct: {
    type: String,
  }
});

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
