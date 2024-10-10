const mongoose = require("mongoose");
const Godown = require("./src/models/godown");

// Connect to your MongoDB
mongoose.connect(
  "mongodb+srv://antarikshthegreatest:jyciHumf5VmrewQ2@cluster0.yopzm.mongodb.net/warehouse-api",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Dummy data based on your provided structure with more godowns and sub-godowns
const ownerId = new mongoose.Types.ObjectId("6707dda12c45771fac6d1ea8");

const godownsData = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Torres, Rowland and Peters Warehouse",
    parent_godown: null,
    owner: ownerId,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Western Center House",
    parent_godown: null,
    owner: ownerId,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Sector 60",
    parent_godown: null,
    owner: ownerId,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Sector 77",
    parent_godown: null,
    owner: ownerId,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Northern Center House",
    parent_godown: null,
    owner: ownerId,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Walls, Leblanc and Williams Warehouse",
    parent_godown: null,
    owner: ownerId,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Central Depot House",
    parent_godown: null,
    owner: ownerId,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Western Distribution House",
    parent_godown: null,
    owner: ownerId,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Watts and Sons Warehouse",
    parent_godown: null,
    owner: ownerId,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Taylor PLC Warehouse",
    parent_godown: null,
    owner: ownerId,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Jones PLC Warehouse",
    parent_godown: null,
    owner: ownerId,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Sanders, Mitchell and Fields Warehouse",
    parent_godown: null,
    owner: ownerId,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Caldwell-Thomas Warehouse",
    parent_godown: null,
    owner: ownerId,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Sanchez and Sons Warehouse",
    parent_godown: null,
    owner: ownerId,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Foster Inc Warehouse",
    parent_godown: null,
    owner: ownerId,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Davis-Stewart Warehouse",
    parent_godown: null,
    owner: ownerId,
  },
];

// Creating sub-godowns for each parent godown with nested relationships
const subGodownsData = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Western Stockpile House",
    parent_godown: godownsData[0]._id,
    owner: ownerId,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Sector 59",
    parent_godown: godownsData[1]._id,
    owner: ownerId,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Sector 11",
    parent_godown: godownsData[1]._id,
    owner: ownerId,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Sector 36",
    parent_godown: godownsData[2]._id,
    owner: ownerId,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Northern Center House",
    parent_godown: godownsData[3]._id,
    owner: ownerId,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Sector 75",
    parent_godown: godownsData[3]._id,
    owner: ownerId,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Sector 98",
    parent_godown: godownsData[4]._id,
    owner: ownerId,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Sector 77",
    parent_godown: godownsData[4]._id,
    owner: ownerId,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Central Depot House",
    parent_godown: godownsData[5]._id,
    owner: ownerId,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Sector 85",
    parent_godown: godownsData[6]._id,
    owner: ownerId,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Sector 71",
    parent_godown: godownsData[7]._id,
    owner: ownerId,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Sector 1",
    parent_godown: godownsData[8]._id,
    owner: ownerId,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Northern Storage House",
    parent_godown: godownsData[9]._id,
    owner: ownerId,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Sector 65",
    parent_godown: godownsData[10]._id,
    owner: ownerId,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Central Storage House",
    parent_godown: godownsData[11]._id,
    owner: ownerId,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Sector 9",
    parent_godown: godownsData[12]._id,
    owner: ownerId,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Zone 7",
    parent_godown: godownsData[12]._id,
    owner: ownerId,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Sector 50",
    parent_godown: godownsData[13]._id,
    owner: ownerId,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Sector 36",
    parent_godown: godownsData[14]._id,
    owner: ownerId,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Zone 61",
    parent_godown: godownsData[15]._id,
    owner: ownerId,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Zone 49",
    parent_godown: godownsData[15]._id,
    owner: ownerId,
  },
  // Add as many more sub-godowns as needed with appropriate hierarchy
];

// Function to seed the godowns and sub-godowns
const seedDatabase = async () => {
  try {
    await Godown.deleteMany(); // Clear existing data if needed

    // Insert parent godowns
    await Godown.insertMany(godownsData);
    console.log("Parent godowns inserted successfully.");

    // Insert sub-godowns
    await Godown.insertMany(subGodownsData);
    console.log("Sub-godowns inserted successfully.");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

// Execute the seeding function
seedDatabase();
