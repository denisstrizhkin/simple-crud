import React, { SetStateAction, useEffect, useState } from "react";
import Product from "../models/Product";

const defaultImg: string = "";

interface ProductSingleProps {
  isCreate: boolean;
  url: string;
  selectedId: string;
  setDisplay: React.Dispatch<SetStateAction<Display>>;
}

function ProductSingle({
  url,
  selectedId,
  isCreate,
  setDisplay,
}: ProductSingleProps) {
  const [product, setProduct] = useState<Product>({
    _id: "",
    name: "Name",
    quantity: 0,
    price: 0,
    image: defaultImg,
  });

  useEffect(() => {
    if (isCreate) return;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          console.error(response);
          return;
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data["data"]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [product]);

  const btnBackClicked = () => {
    setDisplay("list");
  };

  return (
    <div className="ProductSingle">
      <label htmlFor="name">Name</label>
      <input type="text" name="name" value={product.name} />

      <label htmlFor="price">Price</label>
      <input type="number" name="price" value={product.price} />

      <label htmlFor="quantity">Quantity</label>
      <input type="number" name="quantity" value={product.quantity} />

      {isCreate ? <button onClick={btnBackClicked}>Добавить</button> : null}
      {!isCreate ? <button onClick={btnBackClicked}>Изменить</button> : null}
      {!isCreate ? <button onClick={btnBackClicked}>Удалить</button> : null}
      <button onClick={btnBackClicked}>Назад</button>
    </div>
  );
}

export default ProductSingle;
