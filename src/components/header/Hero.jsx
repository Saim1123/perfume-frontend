import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="bg flex flex-col justify-center px-12 gap-2">
      <h1 className="text-7xl font-bold">First Heading</h1>
      <p className="text-base mt-2">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat, iure. <br /> ipsum dolor sit amet
        consectetur adipisicing elit.
      </p>
      <div className="flex flex-col md:flex-row gap-3 mt-4">
        <button
          onClick={() => navigate("/products")}
          className="bg-black px-4 py-2 border-[2px] border-black text-white"
        >
          Buy Products
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="border-black px-4 py-2 border-[2px] hover:bg-black hover:text-white"
        >
          Create Account
        </button>
      </div>
    </section>
  );
};

export default Hero;
