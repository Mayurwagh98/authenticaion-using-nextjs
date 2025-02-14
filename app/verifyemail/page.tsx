"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const VerifyEmailPage = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);

  const verifyEmailToken = async () => {
    try {
      const { data } = await axios.post("/api/users/verifyemail", {
        token,
      });
      console.log("data:", data);
      if (data.success) {
        setVerified(true);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    const newUrl = window.location.search.split("=")[1];
    setToken(newUrl || "");
  }, []);

  useEffect(() => {
    if (token) {
      verifyEmailToken();
    }
  }, [token]);

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
