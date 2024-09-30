import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useProductStore } from "../../store/productStore";
import { useCartStore } from "../../store/cartStore";

const Product = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isLoading, error } = useProductStore();
  const { addToCart } = useCartStore();

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!product || !product.images) return <p>No product found</p>;
  const img1 = product.images[0];
  const img2 = product.images[1];

  return (
    <div className="flex flex-col shadow-md text-center">
      <Link to={`/products/${product._id}`} className="cursor-pointer">
        <img
          src={isHovered ? img2 : img1}
          alt={product.name}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </Link>
      <div className="text-sm w-full flex flex-col gap-4 border-t py-6">
        <div className="text-[12px]">
          <p>{product.name}</p>
          <p>RS.{product.price}</p>
        </div>
        <div>
          <Link
            to="/carts"
            onClick={() => addToCart(product._id)}
            className="border px-6 py-2 bg-black text-white cursor-pointer rounded-md hover:bg-gray-700 transition"
          >
            Add to cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
