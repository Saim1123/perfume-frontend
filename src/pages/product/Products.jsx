import React, { useEffect } from "react";
import Product from "../../components/product/Product";
import { useProductStore } from "../../store/productStore";
import { ClipLoader } from "react-spinners";

const Products = () => {
  const { products, fetchAllProducts, isLoading, error } = useProductStore();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <ClipLoader color="black" size={40} />
      </div>
    );
  if (error) console.error(error);

  return (
    <div className="my-6">
      <h2 className="text-center my-6 text-2xl uppercase">FLORA COLLECTION</h2>

      {isLoading ? (
        <div className="w-4/5 mx-auto flex items-center justify-center mt-4">
          <ClipLoader color="black" size={40} />
        </div>
      ) : (
        <div className="w-full lg:w-4/5 mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 items-center">
          {products.map(product => (
            <Product id={product._id} key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
