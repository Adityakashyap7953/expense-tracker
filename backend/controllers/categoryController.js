const Category = require("../Category");

// GET USER CATEGORIES
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({
      userId: req.userId,
    }).sort({ createdAt: 1 });

    res.status(200).json(categories);
  } catch (error) {
    console.log("GET CATEGORY ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ADD CATEGORY
const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Category name is required",
      });
    }

    const existingCategory = await Category.findOne({
      name: name.trim(),
      userId: req.userId,
    });

    if (existingCategory) {
      return res.status(400).json({
        message: "Category already exists",
      });
    }

    const category = new Category({
      name: name.trim(),
      userId: req.userId,
    });

    await category.save();

    res.status(201).json(category);
  } catch (error) {
    console.log("ADD CATEGORY ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// UPDATE CATEGORY
const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Category name is required",
      });
    }

    const existingCategory = await Category.findOne({
      name: name.trim(),
      userId: req.userId,
      _id: { $ne: req.params.id },
    });

    if (existingCategory) {
      return res.status(400).json({
        message: "Category already exists",
      });
    }

    const category = await Category.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.userId,
      },
      {
        name: name.trim(),
      },
      {
        new: true,
      }
    );

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json(category);
  } catch (error) {
    console.log("UPDATE CATEGORY ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// DELETE CATEGORY
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    await Category.findByIdAndDelete(req.params.id);

    res.json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log("DELETE CATEGORY ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};