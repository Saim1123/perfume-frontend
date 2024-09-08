import React from "react";
import Product from "../../components/product/Product";

const Products = () => {
  return (
    <div className="my-6">
      <h2 className="text-center my-6 text-2xl uppercase">FLORA COLLECTION</h2>
      <div className="w-full lg:w-4/5 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
    </div>
  );
};

export default Products;
