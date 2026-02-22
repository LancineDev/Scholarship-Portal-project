import { useState } from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import AuthButton from "../../components/AuthButton";

const SignUp = () => {
  const { createUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: "var(--accent-100)",
    iconColor: "var(--primary-500)",
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  const onSubmit = async (data) => {
    const { fullName, email, password } = data;
    let photoURL = "";

    try {
      // Upload image if file selected
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const res = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`, {
          method: "POST",
          body: formData
        });

        const imgData = await res.json();
        if (imgData.success) {
          photoURL = imgData.data.url;
        } else {
          setError("Failed to upload profile image. Try again.");
          return;
        }
      }

      // Create Firebase user
      await createUser(email, password);
      await updateUserProfile(fullName, photoURL);

      // Save user to backend
      const userInfo = { name: fullName, email, role: "user", photo: photoURL };
      const response = await axiosPublic.post("/users", userInfo);

      if (response.data.insertedId) {
        reset();
        navigate("/");
        Toast.fire({ icon: "success", title: "Signed up successfully" });
      } else {
        setError("Failed to sign up. Try again later.");
      }

    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Email is already in use. Please use a different email.");
      } else {
        console.error(err);
        setError("Failed to sign up. Try again later.");
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>10bourse | Inscription</title>
      </Helmet>

      <section className="bg-accent-200">
        <div className="flex justify-center min-h-screen">
          {/* Left half image */}
          <div className="hidden lg:block lg:w-2/5 bg-no-repeat bg-contain bg-center" style={{ backgroundImage: "url('./signup.svg')" }}></div>

          {/* Right half form */}
          <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
            <div className="w-full">
              <h1 className="text-2xl font-bold tracking-wider capitalize">Get your free account now.</h1>
              <p className="mt-4 text-gray-500">Set up your profile and start your journey.</p>

              <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label className="block mb-2 text-sm text-primary-800">Full Name</label>
                  <input
                    type="text"
                    {...register("fullName", {
                      required: "Full name is required*",
                      validate: value => value.trim().split(" ").length >= 2 || "Full name must contain at least two words*"
                    })}
                    placeholder="John Doe"
                    className={`block w-full px-5 py-3 mt-2 bg-accent-50 placeholder-gray-500 rounded focus:ring-primary-700 focus:outline-none focus:ring border-2 ${errors.fullName ? 'border-red-400 border-opacity-70' : 'border-transparent'}`}
                  />
                  {errors.fullName && <p className="mt-1 text-sm text-red-500 italic">{errors.fullName.message}</p>}
                </div>

                {/* Profile Photo (optional) */}
                <div>
                  <label className="block mb-2 text-sm text-primary-800">Profile Photo (optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="block w-full px-2 py-2 mt-2 bg-accent-50 placeholder-gray-500 rounded focus:ring-primary-700 focus:outline-none focus:ring border-2 border-transparent"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-2 text-sm text-primary-800">Email address</label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required*",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Enter a valid email address*"
                      }
                    })}
                    placeholder="johndoe@mail.com"
                    className={`block w-full px-5 py-3 mt-2 bg-accent-50 placeholder-gray-500 rounded focus:ring-primary-700 focus:outline-none focus:ring border-2 ${errors.email ? 'border-red-400 border-opacity-70' : 'border-transparent'}`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500 italic">{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="block mb-2 text-sm text-primary-800">Password</label>
                  <input
                    type="password"
                    {...register("password", {
                      required: "Password is required*",
                      minLength: { value: 6, message: "Password must be at least 6 characters long*" },
                      validate: {
                        hasCapitalLetter: value => /[A-Z]/.test(value) || "Password must contain at least one capital letter*",
                        hasSpecialChar: value => /[!@#$%^&*(),.?":{}|<>]/.test(value) || "Password must contain at least one special character*"
                      }
                    })}
                    placeholder="Enter your password"
                    className={`block w-full px-5 py-3 mt-2 bg-accent-50 placeholder-gray-500 rounded focus:ring-primary-700 focus:outline-none focus:ring border-2 ${errors.password ? 'border-red-400 border-opacity-70' : 'border-transparent'}`}
                  />
                  {errors.password && <p className="mt-1 text-sm text-red-500 italic">{errors.password.message}</p>}
                </div>

                {/* Sign Up Button */}
                <AuthButton text="Sign Up" />
              </form>

              {/* Firebase or API error */}
              {error && <p className="mt-2 text-sm text-red-500 italic">{error}</p>}

              <p className="mt-5 text-sm leading-relaxed text-grey-900">
                Already registered? <Link to="/login" className="font-bold text-grey-700 hover:underline hover:text-primary-500">Login to your Account</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
