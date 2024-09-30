import { useFormik } from "formik";
import * as yup from "yup";
import ClipLoader from "react-spinners/ClipLoader";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { login, error, isLoading } = useAuthStore();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Invalid email address").required("Email is required"),
      password: yup.string().required("Password is required"),
    }),
    onSubmit: async ({ email, password }) => {
      try {
        await login(email, password);
        navigate("/");
        toast.success("Login successfully");
      } catch (error) {
        console.error("Error: ", error);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-[90%] bg-white shadow-md flex mt-6 justify-center flex-col gap-6 md:w-1/2 mx-auto p-10"
    >
      <h2 className="text-xl md:text-2xl text-center ">Login With Your Account</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="p-2 border-b-[1.5px] text-sm md:text-base border-black focus:outline-none"
      />
      {formik.touched.email && formik.errors.email ? (
        <div className="text-red-600 text-sm md:text-base px-1">{formik.errors.email}</div>
      ) : null}

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="p-2 border-b-[1.5px] text-sm md:text-base border-black focus:outline-none"
      />
      {formik.touched.password && formik.errors.password ? (
        <div className="text-red-600 text-sm md:text-base px-1">{formik.errors.password}</div>
      ) : null}

      {error && <div className="text-red-600 text-sm md:text-base">{error}</div>}

      <p className="text-sm text-gray-500">
        Don't have an account?{" "}
        <Link className="underline text-black" to="/signup">
          Signup
        </Link>
      </p>

      <button
        type="submit"
        disabled={isLoading || !formik.isValid}
        className={`py-2 px-4 rounded-sm bg-black text-white hover:bg-gray-900 cursor-pointer flex items-center justify-center`}
      >
        {isLoading ? <ClipLoader color="white" size={20} /> : "Login"}
      </button>
      <p className="text-sm text-gray-500">
        <Link className="underline text-black" to="/forget-password">
          Forget Password?
        </Link>
      </p>
    </form>
  );
};

export default Login;
