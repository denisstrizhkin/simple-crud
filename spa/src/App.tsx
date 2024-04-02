import { useState } from "react";
import "./App.css";
import ProductsList from "./components/ProductsList";
import ProductSingle from "./components/ProductSingle";

function App() {
  const url: string = "http://localhost:3000/products";
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [display, setDisplay] = useState<Display>("list");

  const switchDisplay = (d: Display) => {
    switch (d) {
      case "list":
        return (
          <ProductsList
            url={url}
            setSelectedId={setSelectedId}
            setDisplay={setDisplay}
          />
        );
      case "add":
        return (
          <ProductSingle
            url={url}
            isCreate={true}
            selectedId={selectedId}
            setDisplay={setDisplay}
          />
        );
      case "single":
        return (
          <ProductSingle
            url={url}
            isCreate={false}
            selectedId={selectedId}
            setDisplay={setDisplay}
          />
        );
    }
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      {switchDisplay(display)}
    </div>
  );
}

export default App;
