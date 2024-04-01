import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Product from "../models/Product";

interface ProductProps {
  product: Product;
}

function ProductCard({ product }: ProductProps) {
  return (
    <div className="ProductCard">
      <h3>{product.name}</h3>
      <p>Цена: {product.price}Р</p>
      <p>Количество: {product.quantity}</p>
    </div>
  );
}

interface ProductsListProps {
  url: string;
  setSelectedId: Dispatch<SetStateAction<string | null>>;
  setDisplay: Dispatch<SetStateAction<Display>>;
}

function ProductsList({ url, setSelectedId, setDisplay }: ProductsListProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          console.error(response);
          return;
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data["data"]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [products]);

  const addButtonClicked = () => {
    setDisplay("add");
  };

  return (
    <div className="ProductsList">
      <div className="ProductsContainer">
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
      <button onClick={addButtonClicked}>Добавить</button>
    </div>
  );
}

export default ProductsList;
