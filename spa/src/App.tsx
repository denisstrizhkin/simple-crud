import React, { useState } from "react";
import "./App.css";
import ProductsList from "./ProductsList";
import ProductSingle from "./ProductSingle";

function App() {
  const url: string = "http://localhost:3000/products";
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="App">
      <header className="App-header"></header>
      {selectedId === null ? (
        <ProductsList url={url} setSelectedId={setSelectedId} />
      ) : (
        <ProductSingle />
      )}
    </div>
  );
}

export default App;
