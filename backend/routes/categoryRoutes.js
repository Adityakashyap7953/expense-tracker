const express = require("express");

const router = express.Router();

const {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

// Test route
router.get("/test", (req, res) => {
  res.json({
    message: "Category route working",
  });
});

// Add Category
router.post("/", addCategory);

// Get Categories
router.get("/", getCategories);

// Update Category
router.put("/:id", updateCategory);

// Delete Category
router.delete("/:id", deleteCategory);

module.exports = router;