import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useCartStore } from "../store/cartStore";

import ClipLoader from "react-spinners/ClipLoader";
import CheckoutButton from "../components/cart/CheckoutButon";

const Cart = () => {
  const { cartItems, fetchCart, removeFromCart, updateCartQuantity, isLoading, error } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <ClipLoader />
      </div>
    );
  if (error) return <p>{error}</p>;
  if (cartItems.length === 0)
    return (
      <div className="flex flex-col justify-center items-center mt-10 gap-4">
        <p className="text-sm">Your cart is currently empty.</p>
        <Link to="/products" className="bg-black text-white py-2 px-4 text-sm hover:bg-gray-800 rounded-md">
          Continue shopping
        </Link>
      </div>
    );

  const handleIncreaseQuantity = (productId, currentQuantity) => {
    updateCartQuantity(productId, currentQuantity + 1);
  };

  const handleDecreaseQuantity = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateCartQuantity(productId, currentQuantity - 1);
    }
  };

  return (
    <div>
      <ul>
        {cartItems.map(item => (
          <li key={item._id} className="flex flex-col md:flex-row items-center justify-between shadow-md p-4">
            <div className="flex flex-col md:flex-row items-center space-x-2">
              <img src={item.product.images[0]} alt="" className="w-3/6 md:w-[100px] md:h-[100px]" />
              <p>{item.product.name}</p>
              <p className="font-semibold">Rs.{item.product.price * item.quantity}</p>
            </div>
            <div className="flex items-center mt-4 md:mt-0 space-x-10">
              <div className="flex items-center space-x-4 border-b-2 border-black">
                <button
                  className="text-3xl cursor-pointer"
                  onClick={() => handleDecreaseQuantity(item.product._id, item.quantity)}
                >
                  -
                </button>
                <p>{item.quantity}</p>
                <button
                  className="text-2xl cursor-pointer"
                  onClick={() => handleIncreaseQuantity(item.product._id, item.quantity)}
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="px-4 py-2 border-black border-2 rounded-md hover:bg-black hover:text-white transition"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <hr className="mt-2" />
      <div className="p-8 mt-4 border border-black flex flex-col justify-center items-center gap-3">
        <div className="flex items-center gap-4">
          <p>Subtotal</p>
          <h3 className="font-bold">RS.{calculateSubtotal()}</h3>
        </div>
        <div className="text-sm">Taxes and shipping calculated at checkout</div>
        <div>
          <CheckoutButton />
        </div>
      </div>
    </div>
  );
};

export default Cart;
