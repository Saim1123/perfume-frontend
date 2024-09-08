import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import ClipLoader from "react-spinners/ClipLoader";
import { useAuthStore } from "../../store/authStore";

const Signup = () => {
  const navigate = useNavigate();
  const { signup, error, isLoading } = useAuthStore();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },

    validationSchema: yup.object({
      firstName: yup.string().min(3, "First Name must be at least 3 characters").required("First Name is required"),
      lastName: yup.string().min(3, "Last Name must be at least 3 characters").required("Last Name is required"),
      email: yup.string().email("Invalid email address").required("Email is required"),
      password: yup
        .string()
        .min(5, "Password must be at least 5 characters")
        .max(16, "Password must not exceed 16 characters")
        .required("Password is required"),
    }),

    onSubmit: async ({ firstName, lastName, email, password }, { resetForm }) => {
      try {
        await signup(firstName, lastName, email, password);
        navigate("/verify-email");
      } catch (error) {
        console.log("Error: ", error);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-[90%] bg-white shadow-md flex mt-6 justify-center flex-col gap-6 md:w-1/2 mx-auto p-10"
    >
      <h2 className="text-xl text-center md:text-2xl">Create An Account</h2>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="p-2 text-sm md:text-base border-b-[1.5px] border-black focus:outline-none"
      />
      {formik.touched.firstName && formik.errors.firstName ? (
        <div className="text-red-600 text-sm md:text-base px-1">{formik.errors.firstName}</div>
      ) : null}

      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="p-2 border-b-[1.5px] text-sm md:text-base border-black focus:outline-none"
      />
      {formik.touched.lastName && formik.errors.lastName ? (
        <div className="text-red-600 px-1 text-sm md:text-base rounded-sm">{formik.errors.lastName}</div>
      ) : null}

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
        <div className="text-red-600 px-1 text-sm md:text-base rounded-sm">{formik.errors.email}</div>
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
        <div className="text-red-600 px-1 text-sm md:text-base rounded-sm">{formik.errors.password}</div>
      ) : null}

      {error && <div className="text-red-600 text-sm md:text-base">{error}</div>}

      <p className="text-sm text-gray-500">
        Already have an account?{" "}
        <Link className="underline text-black" to="/login">
          Login
        </Link>
      </p>
      <button
        type="submit"
        disabled={isLoading || !formik.isValid}
        className={`py-2 px-4 rounded-sm bg-black text-white hover:bg-gray-900 cursor-pointer flex items-center justify-center`}
      >
        {isLoading ? <ClipLoader color="white" size={20} /> : "Signup"}
      </button>
    </form>
  );
};

export default Signup;
