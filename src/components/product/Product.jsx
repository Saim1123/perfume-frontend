import React, { useState } from "react";
import { Link } from "react-router-dom";
import img1 from "../../assets/product1_img1.png";
import img2 from "../../assets/product1_img2.png";

const Product = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div className="flex flex-col shadow-md text-center">
      <Link to={`/products/${1}`} className="cursor-pointer">
        <img
          src={isHovered ? img2 : img1}
          alt="image"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </Link>
      <div className="text-sm w-full flex flex-col gap-4 border-t py-6">
        <div className="text-[12px]">
          <p>MOTIA SAMBAC EDP</p>
          <p>RS.6,900</p>
        </div>
        <div>
          <Link to="/carts" className="border px-6 py-2 bg-black text-white cursor-pointer">
            Add to cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
