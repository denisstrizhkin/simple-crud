import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Product from "../models/Product";

interface ProductProps {
  product: Product;
  setSelectedId: Dispatch<SetStateAction<string | undefined>>;
  setDisplay: Dispatch<SetStateAction<Display>>;
}

function ProductCard({ product, setSelectedId, setDisplay }: ProductProps) {
  const cardClicked = () => {
    setSelectedId(product._id);
    setDisplay("single");
  };

  return (
    <div className="ProductCard" onClick={cardClicked}>
      <img src={product.image} />
      <h3>{product.name}</h3>
      <p>Цена: {product.price}Р</p>
      <p>Количество: {product.quantity}</p>
    </div>
  );
}

interface ProductsListProps {
  url: string;
  setSelectedId: Dispatch<SetStateAction<string | undefined>>;
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
  }, []);

  const addButtonClicked = () => {
    setDisplay("add");
  };

  return (
    <div className="ProductsList">
      <div className="ProductsContainer">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            setSelectedId={setSelectedId}
            setDisplay={setDisplay}
          />
        ))}
      </div>
      <button onClick={addButtonClicked}>Добавить</button>
    </div>
  );
}

export default ProductsList;
