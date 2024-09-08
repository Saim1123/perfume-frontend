import { useFormik } from "formik";
import * as yup from "yup";
import ClipLoader from "react-spinners/ClipLoader";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const VerifyEmail = () => {
  const { verifyEmail, error, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: yup.object({
      code: yup.string().min(6, "Code must be at least 6 characters").required("Verification code is required"),
    }),
    onSubmit: async ({ code }) => {
      try {
        await verifyEmail(code);
        navigate("/dashboard");
        toast.success("Email verified successfully");
      } catch (err) {
        console.error("Verification error: ", err);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-[90%] bg-white shadow-md flex mt-6 justify-center flex-col gap-6 md:w-1/2 mx-auto p-10"
    >
      <h2 className="text-xl text-center md:text-2xl">Verify Your Email</h2>

      {/* Input for the verification code */}
      <input
        type="text"
        name="code"
        placeholder="Enter Verification Code"
        value={formik.values.code}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="p-2 text-sm md:text-base border-b-[1.5px] border-black focus:outline-none"
      />
      {/* Formik validation error */}
      {formik.touched.code && formik.errors.code ? (
        <div className="text-red-600 text-sm md:text-base p-1 bg-red-200 rounded-sm">{formik.errors.code}</div>
      ) : null}

      {/* Zustand error handling */}
      {error && (
        <div className="text-red-600 text-sm md:text-base p-1 bg-red-200 rounded-sm">
          {error} {/* Display the server error from Zustand */}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading || !formik.isValid}
        className={`py-2 px-4 rounded-sm bg-black text-white hover:bg-gray-900 cursor-pointer flex items-center justify-center`}
      >
        {isLoading ? <ClipLoader color="white" size={20} /> : "Verify Email"}
      </button>
    </form>
  );
};

export default VerifyEmail;
