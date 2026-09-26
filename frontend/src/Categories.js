import React, { useState } from "react";

function Categories() {
  const [categories, setCategories] = useState([
    "Food",
    "Travel",
    "Medicine",
    "Shopping",
    "Vegetables",
    "Fruits",
    "Bills",
    "Education",
    "Other",
  ]);

  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      alert("Please enter category name");
      return;
    }

    setCategories([...categories, newCategory.trim()]);
    setNewCategory("");
  };

  return (
    <div className="categories-page">

      <div className="categories-header">
        <div>
          <h1>Categories</h1>
          <p>Manage your expense categories</p>
        </div>

        <div>
          <input
            type="text"
            placeholder="Enter category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />

          <button onClick={handleAddCategory}>
            + Add Category
          </button>
        </div>
      </div>

      <div className="categories-list">

        {categories.map((category, index) => (
          <div className="category-card" key={index}>
            <span>📁</span>
            <span>{category}</span>
          </div>
        ))}

      </div>

    </div>
  );
}

export default Categories;