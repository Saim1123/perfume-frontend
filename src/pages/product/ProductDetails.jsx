import { useState } from "react";
import img1 from "../../assets/product1_img1.png";
import img2 from "../../assets/product1_img2.png";
import img3 from "../../assets/product1_img3.jpg";
import img4 from "../../assets/product1_img4.jpg";

const ProductDetails = () => {
  const [mainImage, setMainImage] = useState(img1);

  const images = [img1, img2, img3, img4];

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex flex-wrap">
        {/* Left Section: Images */}
        <section className="w-full md:w-1/2 flex flex-col items-center">
          <div className="w-4/5">
            <img src={mainImage} alt="Main Product" className="w-full object-cover" />
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
          <h3 className="text-2xl font-semibold mb-4">MOTIA SAMBAC EDP 100ML</h3>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Rs.6,900.00</h3>

          <div className="mb-4">
            <h4 className="font-semibold">Fragrance Family: Floral / Aromatic</h4>
            <h4 className="font-semibold">Intensity: Strong</h4>
          </div>

          <div className="text-sm mb-4">
            <h4 className="font-semibold">Top Notes:</h4>
            <p>Bergamot, Ginger, Cardamom, Cinnamon</p>
            <h4 className="font-semibold">Heart Notes:</h4>
            <p>Jasmine, Neroli, Sage</p>
            <h4 className="font-semibold">Base Notes:</h4>
            <p>Amber, Vanilla, Woody note</p>
          </div>

          <p className="mb-4">
            A floral amber fragrance unveiling the strong facets of motia sambac. As you bask in the embrace of jasmine,
            sage, amber and vanilla, your senses dance to a symphony of floral trail.
          </p>

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
