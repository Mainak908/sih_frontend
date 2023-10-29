import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../redux/slices/cartitem";

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.qty, 0);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Shopping Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cart.map((item, id) => (
          <div key={id} className="bg-white rounded-lg shadow-md p-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-600">{`Price: ${item.price.toFixed(
              2
            )} Rs`}</p>
            <p className="text-gray-600">{`Quantity: ${item.qty}`}</p>
            <p className="text-gray-600">{`Total: ${(
              item.price * item.qty
            ).toFixed(2)} Rs`}</p>
            <button
              className="bg-red-500 text-white py-2 px-4 mt-4 rounded"
              onClick={() => dispatch(remove(item.id))}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <p className="text-xl font-semibold">
          Total: {calculateTotal().toFixed(2)}
        </p>
        <button className="bg-indigo-600 text-white py-3 px-6 mt-4 rounded hover:bg-indigo-700">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
