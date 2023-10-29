import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { add } from "../redux/slices/cartitem";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setproducts] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`http://localhost:3001/api/v1/single-product/${productId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) =>
        setproducts({
          name: data.resp.name,
          price: data.resp.price,
          description: data.resp.description,
          image: data.resp.images[0].url,
        })
      );
  }, [productId]);

  return (
    <div className="container mx-auto py-8">
      <div className="md:flex">
        <div className="md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto md:h-96 object-cover"
          />
        </div>
        <div className="md:w-1/2 mt-4 md:mt-0 md:ml-8">
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <p className="text-gray-600 text-lg">{product.price}</p>
          <p className="mt-4 text-gray-700">{product.description}</p>
          <button
            className="bg-indigo-600 text-white px-6 py-3 mt-4 rounded-md hover:bg-indigo-700"
            onClick={() => dispatch(add(product))}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
