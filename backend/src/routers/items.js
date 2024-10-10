// routes/items.js
const express = require("express");
const router = express.Router();
const Item = require("../models/items");
const Godown = require("../models/godown");
const auth = require("../middleware/auth"); // Adjust the path as necessary
const mongoose = require("mongoose");

router.post("/move-item", auth, async (req, res) => {
  const { itemId, toLocationId } = req.body;

  // Basic validation
  if (!itemId || !toLocationId) {
    return res
      .status(400)
      .json({ message: "itemId and toLocationId are required." });
  }

  // Validate ObjectIds
  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(400).json({ message: "Invalid itemId." });
  }

  if (!mongoose.Types.ObjectId.isValid(toLocationId)) {
    return res.status(400).json({ message: "Invalid toLocationId." });
  }

  try {
    // Fetch the item
    const item = await Item.findById(itemId).populate("godown_id");
    if (!item) {
      return res.status(404).json({ message: "Item not found." });
    }

    // Fetch the destination godown
    const destinationGodown = await Godown.findById(toLocationId);
    if (!destinationGodown) {
      return res.status(404).json({ message: "Destination godown not found." });
    }

    // Fetch the source godown (current location)
    const sourceGodown = await Godown.findById(item.godown_id);
    if (!sourceGodown) {
      return res.status(404).json({ message: "Source godown not found." });
    }

    // Check if the user owns the source godown
    if (sourceGodown.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You do not own the source godown." });
    }

    // Check if the user owns the destination godown
    if (destinationGodown.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You do not own the destination godown." });
    }

    // Update the item's godown_id
    item.godown_id = destinationGodown._id;
    await item.save();

    // Populate the updated godown_id without execPopulate
    await item.populate("godown_id"); // Corrected line

    return res.status(200).json({
      message: "Item moved successfully.",
      item,
    });
  } catch (error) {
    console.error("Error moving item:", error);
    return res.status(500).json({ message: "Server error." });
  }
});
// Create a new Item
router.post("items/", auth, async (req, res) => {
  try {
    const {
      name,
      quantity,
      category,
      price,
      status,
      godown_id,
      brand,
      attributes,
      image_url,
    } = req.body;

    // Validate that the godown exists and belongs to the user
    const godown = await Godown.findOne({
      _id: godown_id,
      owner: req.user._id,
    });
    if (!godown) {
      return res.status(400).send({ error: "Invalid godown_id" });
    }

    const item = new Item({
      name,
      quantity,
      category,
      price,
      status: status || "in_stock",
      godown_id,
      brand,
      attributes,
      image_url,
    });

    await item.save();
    res.status(201).send(item);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Get all Items for the authenticated user with optional filters
router.get("items/", auth, async (req, res) => {
  try {
    const { category, status, search, minPrice, maxPrice, godown_id } =
      req.query;
    let filter = {};

    // If godown_id is provided, ensure it belongs to the user
    if (godown_id) {
      const godown = await Godown.findOne({
        _id: godown_id,
        owner: req.user._id,
      });
      if (!godown) {
        return res.status(400).send({ error: "Invalid godown_id" });
      }
      filter.godown_id = godown_id;
    } else {
      // If godown_id is not provided, fetch godowns owned by the user and get their IDs
      const godowns = await Godown.find({ owner: req.user._id });
      const godownIds = godowns.map((g) => g._id);
      filter.godown_id = { $in: godownIds };
    }

    if (category) {
      filter.category = category;
    }

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.name = { $regex: search, $options: "i" }; // Case-insensitive search
    }

    if (minPrice) {
      filter.price = { ...filter.price, $gte: Number(minPrice) };
    }

    if (maxPrice) {
      filter.price = { ...filter.price, $lte: Number(maxPrice) };
    }

    const items = await Item.find(filter).populate("godown_id");
    res.send(items);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Get a single Item by ID
router.get("items/:id", auth, async (req, res) => {
  try {
    const itemId = req.params.id;

    const item = await Item.findById(itemId).populate("godown_id");
    if (!item) {
      return res.status(404).send({ error: "Item not found" });
    }

    // Ensure the godown belongs to the user
    if (String(item.godown_id.owner) !== String(req.user._id)) {
      return res.status(403).send({ error: "Access denied" });
    }

    res.send(item);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Update an Item
router.patch("items/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "name",
    "quantity",
    "category",
    "price",
    "status",
    "godown_id",
    "brand",
    "attributes",
    "image_url",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const item = await Item.findById(req.params.id).populate("godown_id");

    if (!item) {
      return res.status(404).send({ error: "Item not found" });
    }

    // Ensure the godown belongs to the user
    if (String(item.godown_id.owner) !== String(req.user._id)) {
      return res.status(403).send({ error: "Access denied" });
    }

    // If godown_id is being updated, validate the new godown
    if (req.body.godown_id) {
      const newGodown = await Godown.findOne({
        _id: req.body.godown_id,
        owner: req.user._id,
      });
      if (!newGodown) {
        return res.status(400).send({ error: "Invalid new godown_id" });
      }
    }

    updates.forEach((update) => {
      item[update] = req.body[update];
    });

    await item.save();
    res.send(item);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Delete an Item
router.delete("items/:id", auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate("godown_id");

    if (!item) {
      return res.status(404).send({ error: "Item not found" });
    }

    // Ensure the godown belongs to the user
    if (String(item.godown_id.owner) !== String(req.user._id)) {
      return res.status(403).send({ error: "Access denied" });
    }

    await item.remove();
    res.send({ message: "Item deleted successfully", item });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
