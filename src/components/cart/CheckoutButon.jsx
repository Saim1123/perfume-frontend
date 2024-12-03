import React from "react";
import axios from "axios";
import { useCartStore } from "../../store/cartStore";
import { useAuthStore } from "../../store/authStore";

const CheckoutButton = () => {
  const { cartItems } = useCartStore();
  const { user } = useAuthStore();

  console.log(cartItems);

  const handleCheckout = async () => {
    try {
      const shippingAddress = JSON.parse(localStorage.getItem("shippingAddress")) || {
        city: "Karachi",
        country: "PK",
      };

      const response = await axios.post("http://localhost:5000/api/v1/orders/create-checkout-session", {
        items: cartItems,
        shippingAddress,
        userId: user._id,
      });

      const { sessionUrl } = response.data;

      window.location.href = sessionUrl;
    } catch (error) {
      console.error("Error during Stripe checkout", error);
      // alert("There was an issue with your checkout. Please try again.");
    }
  };

  return (
    <button onClick={handleCheckout} className="px-4 py-2 bg-black text-white rounded-md hover:bg-black/85 transition">
      Check out
    </button>
  );
};

export default CheckoutButton;
