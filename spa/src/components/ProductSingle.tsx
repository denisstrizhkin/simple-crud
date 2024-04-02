import React, { SetStateAction, useEffect, useState } from "react";
import Product from "../models/Product";

const defaultImg: string = "";

interface ProductSingleProps {
  isCreate: boolean;
  url: string;
  selectedId: string | undefined;
  setDisplay: React.Dispatch<SetStateAction<Display>>;
}

function ProductSingle({
  url,
  selectedId,
  isCreate,
  setDisplay,
}: ProductSingleProps) {
  const [product, setProduct] = useState<Product>({
    _id: undefined,
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

  const btnDeleteClicked = () => {};

  const btnUpdateClicked = () => {};

  const btnAddClicked = () => {
    fetch(url, {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.error(response);
          return;
        }
        console.log(response.json());
        setDisplay("list");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="ProductSingle">
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        value={product.name}
        onChange={(ev) => {
          let tmp = { ...product };
          tmp.name = ev.target.value;
          setProduct(tmp);
        }}
      />

      <label htmlFor="price">Price</label>
      <input
        type="number"
        name="price"
        value={product.price}
        onChange={(ev) => {
          let tmp = { ...product };
          tmp.price = Number(ev.target.value);
          setProduct(tmp);
        }}
      />

      <label htmlFor="quantity">Quantity</label>
      <input
        type="number"
        name="quantity"
        value={product.quantity}
        onChange={(ev) => {
          let tmp = { ...product };
          tmp.quantity = Number.parseFloat(ev.target.value);
          setProduct(tmp);
        }}
      />

      {isCreate ? <button onClick={btnAddClicked}>Add</button> : null}
      {!isCreate ? <button onClick={btnUpdateClicked}>Update</button> : null}
      {!isCreate ? <button onClick={btnDeleteClicked}>Delete</button> : null}
      <button onClick={btnBackClicked}>Back</button>
    </div>
  );
}

export default ProductSingle;
