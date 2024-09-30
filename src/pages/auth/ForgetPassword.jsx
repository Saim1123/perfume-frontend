import { useFormik } from "formik";
import * as yup from "yup";
import { ClipLoader } from "react-spinners";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";

const ForgetPassword = () => {
  const { forgotPassword, isLoading, error } = useAuthStore();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Invalid email address").required("Email is required"),
    }),
    onSubmit: async ({ email }) => {
      try {
        await forgotPassword(email);
        toast.success("Password reset link sent. Please check your email.");
      } catch (err) {
        console.error("Forgot Password error:", err.message);
        toast.error("Failed to send reset link");
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-[90%] bg-white shadow-md flex mt-6 justify-center flex-col gap-6 md:w-1/2 mx-auto p-10"
    >
      <h2 className="text-xl text-center md:text-2xl">Forgot Password</h2>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="p-2 text-sm md:text-base border-b-[1.5px] border-black focus:outline-none"
      />
      {formik.touched.email && formik.errors.email ? (
        <div className="text-red-600 text-sm md:text-base p-1 bg-red-200 rounded-sm">{formik.errors.email}</div>
      ) : null}
      {error && <div className="text-red-600 text-sm md:text-base p-1 bg-red-200 rounded-sm">{error}</div>}
      <button
        type="submit"
        disabled={isLoading || !formik.isValid}
        className="bg-black text-white py-2 px-4 hover:bg-gray-800 flex items-center justify-center"
      >
        {isLoading ? <ClipLoader color="white" size={20} /> : "Send Reset Link"}
      </button>
    </form>
  );
};

export default ForgetPassword;
