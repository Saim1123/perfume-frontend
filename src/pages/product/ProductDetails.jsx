import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "../../store/productStore";

const ProductDetails = () => {
  const { id } = useParams();
  const [mainImage, setMainImage] = useState(null);
  const { product, fetchProductById, isLoading, error } = useProductStore();

  useEffect(() => {
    fetchProductById(id);
  }, [id, fetchProductById]);

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setMainImage(product.images[0]);
    }
  }, [product]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>No product found</p>;

  const images = product.images || [];

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex flex-wrap">
        {/* Left Section: Images */}
        <section className="w-full md:w-1/2 flex flex-col items-center">
          <div className="w-4/5">
            <img src={mainImage} alt={product.name} className="w-full object-cover" />
          </div>
          <div className="flex space-x-2 mt-4">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-20 h-20 object-cover cursor-pointer"
                onClick={() => setMainImage(image)}
              />
            ))}
          </div>
        </section>

        {/* Right Section: Product Details */}
        <section className="w-full md:w-1/2 mt-8 md:mt-0 px-4">
          <h3 className="text-2xl font-semibold mb-4">{product.name}</h3>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Rs.{product.price}</h3>

          <div className="mb-4">
            <h4 className="font-semibold">Fragrance Family: {product.fragranceFamily}</h4>
            <h4 className="font-semibold">Intensity: {product.intensity}</h4>
          </div>

          <div className="text-sm mb-4">
            <h4 className="font-semibold">
              Gener: <span className="font-normal">{product.gender}</span>
            </h4>
            <h4 className="font-semibold">
              Size: <span className="font-normal">{product.size}</span>
            </h4>

            <h4 className="font-semibold">
              Brand: <span className="font-normal">{product.brand}</span>
            </h4>
          </div>

          <p className="mb-4">{product.description}</p>

          <div className="flex items-center space-x-2">
            <button className="py-2 px-4 bg-black text-white font-semibold rounded">Add to cart</button>
            <button className="py-2 px-4 border border-black text-black font-semibold rounded">Buy it now</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetails;
