const mongoose = require("mongoose");
const Godown = require("./src/models/godown"); // Godown model
const Item = require("./src/models/items"); // Item model

// Connect to your MongoDB
mongoose.connect(
  "mongodb+srv://antarikshthegreatest:jyciHumf5VmrewQ2@cluster0.yopzm.mongodb.net/warehouse-api",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Create the item data for each godown (sub-godown) and differentiate items by appending godown name
const createItemsForGodown = (godownId, godownName) => {
  return [
    {
      name: `${godownName} Bosch Hammer Drill 35`,
      quantity: 543,
      category: "Tools",
      price: 199.99,
      status: "in_stock",
      godown_id: godownId,
      brand: "Bosch",
      attributes: {
        type: "Hand Tool",
        material: "Steel",
        warranty_years: 2,
      },
      image_url:
        "https://m.media-amazon.com/images/I/81rjcK69JfL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      name: `${godownName} LEGO Toy Block Set`,
      quantity: 120,
      category: "Toys",
      price: 129.99,
      status: "out_of_stock",
      godown_id: godownId,
      brand: "LEGO",
      attributes: {
        age_range: "5-10",
        material: "Plastic",
        battery_required: false,
      },
      image_url:
        "https://m.media-amazon.com/images/I/51ZKZLRWgqL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      name: `${godownName} Black & Decker Screwdriver 54`,
      quantity: 432,
      category: "Tools",
      price: 120.14,
      status: "in_stock",
      godown_id: godownId,
      brand: "Black & Decker",
      attributes: {
        type: "Hand Tool",
        material: "Plastic",
        warranty_years: 1,
      },
      image_url:
        "https://m.media-amazon.com/images/I/51ZKZLRWgqL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      name: `${godownName} Playmobil Dollhouse Set`,
      quantity: 290,
      category: "Toys",
      price: 59.99,
      status: "in_stock",
      godown_id: godownId,
      brand: "Playmobil",
      attributes: {
        age_range: "6-12",
        material: "Plastic",
        battery_required: false,
      },
      image_url:
        "https://m.media-amazon.com/images/I/51XY4RQmD8L._AC_UF1000,1000_QL80_.jpg",
    },
    {
      name: `${godownName} Hasbro Puzzle Game Set`,
      quantity: 154,
      category: "Toys",
      price: 99.99,
      status: "in_stock",
      godown_id: godownId,
      brand: "Hasbro",
      attributes: {
        age_range: "8-12",
        material: "Plastic",
        battery_required: true,
      },
      image_url:
        "https://m.media-amazon.com/images/I/71drGYDMYqL._AC_UF1000,1000_QL80_.jpg",
    },
  ];
};

// Seed items for each sub-godown
const seedItems = async () => {
  try {
    // Fetch all sub-godowns (where parent_godown is not null)
    const subGodowns = await Godown.find({ parent_godown: { $ne: null } });

    // Iterate through each sub-godown and create items
    for (const godown of subGodowns) {
      const items = createItemsForGodown(godown._id, godown.name); // Create items for this sub-godown and append godown name

      // Insert items into the database
      await Item.insertMany(items);
      console.log(`Inserted items for sub-godown: ${godown.name}`);
    }

    console.log("Items seeding for sub-godowns completed.");
    mongoose.connection.close(); // Close the connection once done
  } catch (error) {
    console.error("Error seeding items:", error);
    mongoose.connection.close(); // Ensure the connection is closed in case of error
  }
};

// Execute the seed function
seedItems();
