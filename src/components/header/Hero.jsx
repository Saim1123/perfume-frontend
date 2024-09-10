import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const Hero = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  return (
    <section className="bg flex flex-col justify-center px-12 gap-4 py-16">
      <h1 className="text-7xl font-bold w-full md:w-[65%]">Discover the Essence of Luxury</h1>
      <p className="text-base mt-4 w-full md:w-[65%]">
        Indulge in our exquisite collection of perfumes crafted from the finest ingredients. Whether you seek a fresh,
        floral scent or a deep, woody allure, our fragrances offer an unforgettable experience.
      </p>
      <div className="flex flex-col md:flex-row gap-3 mt-6">
        <button
          onClick={() => navigate("/products")}
          className="bg-black px-6 py-3 rounded-md border-[2px] border-black text-white hover:bg-gray-700 transition-colors"
        >
          Shop Perfumes
        </button>
        {!isAuthenticated && (
          <button
            onClick={() => navigate("/signup")}
            className="border-black px-6 py-3 rounded-md border-[2px] hover:bg-black hover:text-white transition"
          >
            Create Account
          </button>
        )}
      </div>
    </section>
  );
};

export default Hero;
