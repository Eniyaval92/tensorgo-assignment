import React, { useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSuccess = (response) => {
    const tokenId = response.credential;
    window.location.href = `http://localhost:5000/auth/google/callback?tokenId=${tokenId}`;
  };

  const handleFailure = (response) => {
    console.error("Login failed:", response);
  };

  return (
    <section className="bg-white">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <form className="w-full max-w-md border p-10 rounded-lg shadow-md">
          <div className="flex gap-3">
            <img
              className="w-auto h-7 sm:h-8"
              src="https://merakiui.com/images/logo.svg"
              alt="Logo"
            />
            <h1 className="text-2xl font-semibold text-gray-800 capitalize sm:text-3xl">
              MailBridge
            </h1>
          </div>

          <h1 className="mt-3 text-xl font-semibold text-gray-800 capitalize sm:text-2xl">
            Sign In / Log In
          </h1>

          <div className="relative flex items-center justify-center mt-10">
            <GoogleOAuthProvider clientId="446804733525-otkufql3ii8jcl3p9tmom9mvde3sq7mr.apps.googleusercontent.com">
              <GoogleLogin
                className="w-full py-3 px-4 text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                onSuccess={handleSuccess}
                onFailure={handleFailure}
                text="continue_with"
                width={"500"}
                size="large"
              />
            </GoogleOAuthProvider>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
