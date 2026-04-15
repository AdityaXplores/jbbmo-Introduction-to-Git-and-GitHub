import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/CartSlice";
import { Link } from "react-router-dom";

const plants = [
  { id: 1, name: "Snake Plant", price: 10, category: "Indoor", image: "https://via.placeholder.com/100" },
  { id: 2, name: "Aloe Vera", price: 12, category: "Medicinal", image: "https://via.placeholder.com/100" },
  { id: 3, name: "Peace Lily", price: 15, category: "Indoor", image: "https://via.placeholder.com/100" },
  { id: 4, name: "Spider Plant", price: 8, category: "Indoor", image: "https://via.placeholder.com/100" },
  { id: 5, name: "Tulsi", price: 5, category: "Medicinal", image: "https://via.placeholder.com/100" },
  { id: 6, name: "Rose", price: 20, category: "Outdoor", image: "https://via.placeholder.com/100" },
];

function ProductList() {
  const dispatch = useDispatch();
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const [addedItems, setAddedItems] = useState({});

  const handleAdd = (plant) => {
    dispatch(addItem(plant));
    setAddedItems(prev => ({ ...prev, [plant.id]: true }));
  };

  const categories = [...new Set(plants.map(p => p.category))];

  return (
    <div>
      {/* Header */}
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/products">Plants</Link> |{" "}
        <Link to="/cart">Cart 🛒 ({totalQuantity})</Link>
      </nav>

      <h2>🌿 Our Plants</h2>

      {categories.map(category => (
        <div key={category}>
          <h3>{category}</h3>

          {plants
            .filter(p => p.category === category)
            .map(plant => (
              <div key={plant.id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
                <img src={plant.image} alt={plant.name} />
                <h4>{plant.name}</h4>
                <p>${plant.price}</p>

                <button
                  onClick={() => handleAdd(plant)}
                  disabled={addedItems[plant.id]}
                >
                  {addedItems[plant.id] ? "Added" : "Add to Cart"}
                </button>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

export default ProductList;
