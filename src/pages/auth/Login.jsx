import axios from "axios";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import ClipLoader from "react-spinners/ClipLoader";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Invalid email address").required("Email is required"),
      password: yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      try {
        await axios.post("http://localhost:5000/api/v1/user/login", values);
        console.log("User Login!");
        resetForm();
      } catch (error) {
        console.log("Error during submission:", error.message);
      } finally {
        setIsSubmitting(false);
        navigate("/");
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-[90%] shadow-md flex mt-6 justify-center flex-col gap-6 md:w-1/2 mx-auto p-10"
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
        <div className="text-red-600 p-2 text-sm md:text-base bg-red-200 rounded-sm">{formik.errors.email}</div>
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
        <div className="text-red-600 p-2 text-sm md:text-base bg-red-200 rounded-sm">{formik.errors.password}</div>
      ) : null}

      <p className="text-sm text-gray-500">
        Don't have an account?{" "}
        <Link className="underline text-black" to="/signup">
          Signup
        </Link>
      </p>

      <button
        type="submit"
        disabled={isSubmitting || !formik.isValid}
        className={`py-2 px-4 rounded-sm bg-black text-white hover:bg-gray-900 cursor-pointer flex items-center justify-center`}
      >
        {isSubmitting ? <ClipLoader color="white" size={20} /> : "Login"}
      </button>
    </form>
  );
};

export default Login;
