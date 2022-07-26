import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);


  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((r) => r.json())
      .then((items) => setItems(items))
  }, []);

  function handleAddItem(newItem) {
    setItems([...items,newItem])
  }
  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }
  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      } else {
        return item;
      }
    });
    setItems(updatedItems)
  }
  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter((item) => item.id !== deletedItem)
    setItems(updatedItems);
  }
  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={ handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
     
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem = {handleUpdateItem} onDeleteItem = {handleDeleteItem} />
        ))}
     
    </div>
  );
}

export default ShoppingList;
