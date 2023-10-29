import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { PiCoinVerticalThin } from "react-icons/pi";
import { RxCross1 } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";

import { add } from "../redux/slices/cartitem";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 m-4">
      <Link to={`/shop/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover cursor-pointer"
        />
      </Link>
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="text-gray-600">{product.price}</p>
      <button
        className="bg-indigo-600 text-white py-2 px-4 mt-4 rounded"
        onClick={() => dispatch(add(product))}
      >
        Add to Cart
      </button>
    </div>
  );
};

const CartBadge = ({ itemCount }) => (
  <div className="relative group">
    <Link to="/cartpage">
      <AiOutlineShoppingCart
        size={32}
        className="text-gray-600 group-hover:text-red-500 transition duration-300 cursor-pointer"
      />
    </Link>

    {itemCount > 0 && (
      <span className="bg-red-500 text-white text-xs absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center rounded-full shadow-md">
        {itemCount}
      </span>
    )}
  </div>
);

const FrontPage = () => {
  const [products, setproducts] = useState([]);
  const user = useSelector((state) => state.auth.userData);
  const [searchp, setsearchp] = useState(false);
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/fetch-product", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) =>
        data.resp.map((d) =>
          setproducts((prev) => [
            ...prev,
            {
              name: d.name,
              price: d.price,
              image: d.images[0].url,
              id: d._id,
              qty: 1,
            },
          ])
        )
      );
  }, []);
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
    setsearchp(false);
  };

  const handlefunc = (pname) => {
    setQuery(pname);
    setShowSuggestions(false);
    setsearchp(true);
  };
  return (
    <div className="bg-gray-100">
      <header className="bg-gray-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/userhome" className="text-3xl font-semibold">
            MyShop
          </Link>
          <div className=" relative">
            <div className="flex">
              <input
                onChange={(e) => handleInputChange(e)}
                value={query}
                type="text"
                placeholder="Search products..."
                className="py-1 px-2 rounded-lg text-black w-96"
              />
              {showSuggestions && (
                <RxCross1
                  className=" h-6 w-6 absolute right-12 top-1 text-black cursor-pointer"
                  onClick={() => setQuery("")}
                />
              )}
              <BiSearch
                className=" h-8 w-8 cursor-pointer absolute right-3 text-black"
                onClick={() => setsearchp(true)}
              />
            </div>
            {showSuggestions && (
              <div className="absolute z-10 mt-2 py-2 w-96 bg-white rounded-lg shadow-lg">
                {filteredProducts.map((product, id) => (
                  <div
                    key={id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black w-96"
                    onClick={() => handlefunc(product.name)}
                  >
                    <p>{product.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/userhome">Home</Link>
              </li>
              <li>
                <Link to="/userhome">Products</Link>
              </li>
              <li>
                <Link to="/userhome">Contact</Link>
              </li>
              <li>
                <CartBadge itemCount={useSelector((no) => no.cart.length)} />
              </li>
              <li>
                <PiCoinVerticalThin className=" text-white w-6 h-6" />
              </li>
              <li>
                <p className="text-white relative right-4">{user.coin}</p>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-4">Featured Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {(searchp ? filteredProducts : products).map((product, id) => (
            <ProductCard key={id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default FrontPage;
