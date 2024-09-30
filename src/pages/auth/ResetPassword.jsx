import { useFormik } from "formik";
import * as yup from "yup";
import { ClipLoader } from "react-spinners";
import { useAuthStore } from "../../store/authStore";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ResetPassword = () => {
  const { resetPassword, isLoading, error } = useAuthStore();
  const { token } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Please confirm your password"),
    }),
    onSubmit: async ({ password }) => {
      try {
        await resetPassword(token, password);
        toast.success("Password reset successfully");
        navigate("/login");
      } catch (err) {
        console.error("Reset Password error:", err);
        toast.error("Failed to reset password");
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-[90%] bg-white shadow-md flex mt-6 justify-center flex-col gap-6 md:w-1/2 mx-auto p-10"
    >
      <h2 className="text-xl text-center md:text-2xl">Reset Password</h2>

      <input
        type="password"
        name="password"
        placeholder="New Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="p-2 text-sm md:text-base border-b-[1.5px] border-black focus:outline-none"
      />
      {formik.touched.password && formik.errors.password ? (
        <div className="text-red-600 text-sm md:text-base p-1 bg-red-200 rounded-sm">{formik.errors.password}</div>
      ) : null}

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm New Password"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="p-2 text-sm md:text-base border-b-[1.5px] border-black focus:outline-none"
      />
      {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
        <div className="text-red-600 text-sm md:text-base p-1 bg-red-200 rounded-sm">
          {formik.errors.confirmPassword}
        </div>
      ) : null}

      {error && <div className="text-red-600 text-sm md:text-base p-1 bg-red-200 rounded-sm">{error}</div>}

      <button
        type="submit"
        disabled={isLoading || !formik.isValid}
        className="py-2 px-4 rounded-sm bg-black text-white hover:bg-gray-900 cursor-pointer flex items-center justify-center"
      >
        {isLoading ? <ClipLoader color="white" size={20} /> : "Reset Password"}
      </button>
    </form>
  );
};

export default ResetPassword;
