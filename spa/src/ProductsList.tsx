import React, { SetStateAction, useEffect, useState } from "react";
import Product from "./models/Product";

interface ProductProps {
  product: Product;
}

function ProductCard({ product }: ProductProps) {
  return (
    <div className="Product">
      <h3>{product.name}</h3>
      <p>Цена: {product.price}Р</p>
      <p>Количество: {product.quantity}</p>
    </div>
  );
}

interface ProductsListProps {
  url: string;
  setSelectedId: React.Dispatch<SetStateAction<string | null>>;
}

function ProductsList({ url, setSelectedId }: ProductsListProps) {
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

  return (
    <div className="ProductsList">
      {products.map((product) => (
        <ProductCard product={product} />
      ))}
    </div>
  );
}

export default ProductsList;
