"use client"; // Indicates this is a client-side component

import axios from "axios";
import { useEffect, useState } from "react";

const VerifyEmailPage = () => {
  // State to store the verification token from URL
  const [token, setToken] = useState("");
  // State to track if email is verified
  const [verified, setVerified] = useState(false);

  // Function to verify email token with the backend
  const verifyEmailToken = async () => {
    try {
      // Send POST request to verify email endpoint
      const { data } = await axios.post("/api/users/verifyemail", {
        token,
      });
      console.log("data:", data);
      // Update verified state if verification successful
      if (data.success) {
        setVerified(true);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  // Effect to extract token from URL on component mount
  useEffect(() => {
    const newUrl = window.location.search.split("=")[1];
    setToken(newUrl || "");
  }, []);

  // Effect to trigger verification when token is available
  useEffect(() => {
    if (token) {
      verifyEmailToken();
    }
  }, [token]);

  // Render verification status UI
  return (
    <div className="flex flex-col justify-center items-center mt-[10%]">
      <h1>Verify Email</h1>
      <p
        className={`${
          verified ? "text-green-500 font-bold" : "text-red-500 font-bold"
        }`}
      >
        {verified
          ? "Email verification successful"
          : "Email verification failed"}
      </p>
    </div>
  );
};

export default VerifyEmailPage;
